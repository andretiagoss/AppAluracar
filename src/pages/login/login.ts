import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'andretiagoss@gmail.com.br';
  senha: string = 'alura123';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _usuariosService: UsuariosServiceProvider) {
  }

  efetuaLogin(){
    console.log(this.email);
    console.log(this.senha);

    this._usuariosService
        .efetuaLogin(this.email, this.senha)
        .subscribe(
          (usuario: Usuario) => {
            console.log(usuario);
            
            //Ao inves de utilizar o método push para navegar para a pagina Home, 
            //utiliza-se o método setRoot para que torne a pagina Home a pagina raiz da aplicação
            //desta forma o usuário não consegue voltar para a pagina Login.
            this.navCtrl.setRoot(HomePage);
          },
          () => {
            this._alertCtrl.create({
              title: 'Falha no login',
              subTitle: 'Email ou senha incorretos! Verifique!',
              buttons: [
                { text: 'Ok' }
              ]
            }).present();
          }
        )        
  }
}
