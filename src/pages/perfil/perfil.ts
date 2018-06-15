import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _usuariosService: UsuariosServiceProvider,
              private _camera: Camera) {
  }

  tiraFoto(){
    this._camera.getPicture({ //getPicture é o método responsavel por tirar a foto
      destinationType: this._camera.DestinationType.FILE_URI, //utiliza-se a forma de acesso a foto no dispotivo pela uri da mesma.
      saveToPhotoAlbum: true, //salva a foto no album do dispotivo
      correctOrientation: true //evita da foto ficar invertida.
    })
    .then(fotoUri => {
      fotoUri = normalizeURL(fotoUri); //normaliza a uri da foto para qualquer plataforma que for usar
      this._usuariosService.salvaAvatar(fotoUri);
    })
    .catch(err => console.log(err));
  }

  get avatar(){
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado(){
    return this._usuariosService.obtemUsuarioLogado();
  }
}
