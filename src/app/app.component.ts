import { Agendamento } from './../modelos/agendamento';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  //Definição dos itens do menu.
  public paginas = [
    { titulo: 'Agendamentos', componente: ListaAgendamentosPage.name, icone: 'calendar' },
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person' }
  ];
  
  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private _usuariosService: UsuariosServiceProvider,
              private _onesignal: OneSignal,
              private _agendamentoDao: AgendamentoDaoProvider) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

        //configurar onesignal
        let iosConfigs = {
          //define se o app esta habilitado a perguntar ao usuário por um popup se habilita ou não o recebimento de notificações.
          kOSSettingsKeyAutoPrompt: true,

          //define se o app vai receber na notificação uma url pra fazer uma navegação interna no app
          kOSSettingsKeyInAppLaunchURL: false
        }
        
        this._onesignal
            .startInit("f74f11db-a9ab-466d-9cc1-eb6c8eb26347", "432215059857")                       
            .iOSSettings(iosConfigs);
                        
        //define como o app se comporta quando receber a notificação, vai receber mesmo que o app esteja aberto.
        this._onesignal.inFocusDisplaying(
          this._onesignal.OSInFocusDisplayOption.Notification
        );

        //define o que será feito quando receber a notificação.
        this._onesignal.handleNotificationReceived()
            .subscribe(
              (notificacao: OSNotification) => {
                //acessa a notificação para passar informações adicionais.
                let dadosAdicionais = notificacao.payload.additionalData;                
                let agendamentoId = dadosAdicionais['agendamento-id'];

                this._agendamentoDao.recupera(agendamentoId)
                    .subscribe(
                      (agendamento: Agendamento) => {
                        agendamento.confirmado = true;

                        this._agendamentoDao.salva(agendamento);
                      }
                    )                              
              }
            );
            
            this._onesignal.endInit();
      });   
  }

  irParaPagina(componente){
    this.nav.push(componente);
  }

  get avatar(){
     return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado(){
    return this._usuariosService.obtemUsuarioLogado();
  }

}

