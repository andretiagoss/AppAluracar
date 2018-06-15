import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from './../escolha/escolha';
import { Carro } from './../../modelos/carro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {
  public carros: Carro[];

  constructor(public navCtrl: NavController,     
    private _loadingCtrl : LoadingController, 
    private _alertCtrl : AlertController,
    private _carrosService: CarrosServiceProvider) {}
    
    //implementa o cliclo de vida do Ionic com o método ionViewDidLoad
    ionViewDidLoad(){
      //utilização do componente LoadingController para exibir mensagem de carregamento para o usuário.
      let loading = this._loadingCtrl.create({ 
        content : 'Carregando carros...'
      });
      
      loading.present();

      //exemplo de lista estatica do modelo
      // this.carros = [
      //   {nome: "Azera V6", preco: 85000},      
      //   {nome: "ONIX 1.6", preco: 35000}      
      // ];

      this._carrosService.lista()
                .subscribe(
                  (carros) => {
                    this.carros = carros; 

                    //retira mensagem de carregamento apos a requição ter ocorrido com sucesso.
                    loading.dismiss();
                  },
                  (err: HttpErrorResponse) => {
                    console.log(err);

                    loading.dismiss();
                    
                    //utilização do componente AlertController para exibir um alerta em caso de erro para o usuário.
                    this._alertCtrl.create({
                      title: 'Falha na conexão',
                      subTitle: 'Não foi possivel carregar a lista de carros. Tente novamente mais tarde!',
                      buttons:[
                        { text: 'OK' }
                      ]
                    }).present();
                  }
                );
    }

    selecionaCarro(carro : Carro){
      console.log(carro);

      //utiliza a variavel "navCtrl" do tipo NavController, que foi injetado no construtor, 
      //que é utilizado para controlar (empilhar) navegações entre paginas, no caso, para a pagina EscolhaPage via lazy loading, 
      //ou seja, não foi importado no modulo principal app.module.
      this.navCtrl.push(EscolhaPage.name, {
        carroSelecionado : carro
      });
    }

}
