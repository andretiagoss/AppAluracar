
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[];
  private _alerta;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _agendamentoDao: AgendamentoDaoProvider,
              private _alertCtrl: AlertController,
              private _agendamentosService: AgendamentoServiceProvider) {
  }

  //metodo relativo ao estado de vida do app. É executado quando a pagina é carregada
  ionViewDidLoad() {
    this._agendamentoDao.listaTodos()
        .subscribe(
          (agendamentos: Agendamento[]) => {
            this.agendamentos = agendamentos;
          }
        )
  }

  //É executado quando a pagina acabou de entrar na tela para visualização do usuário. 
  ionViewDidEnter(){
    setTimeout(() => this.atualizaAgendamentos(),5000);
  }

  atualizaAgendamentos(){
    this.agendamentos
        .filter((agendamento: Agendamento) => agendamento.confirmado)
        .forEach((agendamento: Agendamento) => {
          agendamento.visualizado = true;

          this._agendamentoDao.salva(agendamento);
        })
  }

  reenvia(agendamento: Agendamento){       

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { 
          text: 'ok'
        }
      ]
    });

    let mensagem = '';

    this._agendamentosService.agenda(agendamento)
        .mergeMap((valor) => { 

          let observable =  this._agendamentoDao.salva(agendamento);
          if (valor instanceof Error){            
            throw valor;
          }          

          return observable;
        }) //Apos o retorno do observable deste método, chama o método "salva".
        .finally(
          () => {
            this._alerta.setSubTitle(mensagem);
            this._alerta.present();
          }
        )
        .subscribe(
          () => mensagem = 'Agendamento reenviado!',
          (err: Error) => mensagem = err.message
        );
  }

}
