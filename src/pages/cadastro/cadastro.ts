import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';

import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  
  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  private _alerta : Alert;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentosService : AgendamentoServiceProvider,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _vibration: Vibration,
    private _datePicker: DatePicker) {
      
      this.carro = this.navParams.get('carroSelecionado');
      this.precoTotal = this.navParams.get('precoTotal');      
  }

  selecionaData(){
    this._datePicker.show({
      date: new Date(),
      mode: 'date'
    })
    .then(data => this.data = data.toISOString());
  }

  agenda(){    
    
    if (!this.nome || !this.endereco || !this.email){
      this._vibration.vibrate(500);

      //Criação do alerta com suas configurações:
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          { text: 'ok'}
        ]
      }).present(); //apresenta o alerta.

      return;
    }

    let agendamento : Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data,
      visualizado: false
    };

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { 
          text: 'ok', 
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = '';

    this._agendamentoDao.ehDuplicado(agendamento)
        //com o mergeMap é possivel utilizar dois observable.
        .mergeMap(ehDuplicado => {
          if(ehDuplicado){
            throw new Error('Agendamento existente!');
          }

          return this._agendamentosService.agenda(agendamento);
        })            
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
          () => mensagem = 'Agendamento realizado!',
          (err: Error) => mensagem = err.message
        );
  }  
}
