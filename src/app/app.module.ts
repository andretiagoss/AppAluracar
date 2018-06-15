import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { AgendamentoServiceProvider } from '../providers/agendamento-service/agendamento-service';

import 'rxjs/add/operator/finally'; //importado para utilizar o operador "finally" em toda a aplicação.
import 'rxjs/add/operator/do'; //importado para utilizar o operador "do" em toda a aplicação.
import 'rxjs/add/operator/mergeMap'; //importado para utilizar o operador "mergeMap" em toda a aplicação.
import 'rxjs/add/operator/catch'; //importado para utilizar o operador "catch" em toda a aplicação.

import 'rxjs/add/observable/fromPromise'; //importado para utilizar o observable "Promise" em toda a aplicação.
import 'rxjs/add/observable/of'; //importado para utilizar o observable "of" em toda a aplicação.

import { IonicStorageModule } from '@ionic/storage';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { LoginPage } from '../pages/login/login';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';

import { Vibration } from '@ionic-native/vibration'; //importado para utilizar o recurso de vibração
import { DatePicker } from '@ionic-native/date-picker'; //importado para utilizar o recurso nativo de data
import { Camera } from '@ionic-native/camera'; //importado para utilizar o recurso nativo de camera
import { OneSignal } from '@ionic-native/onesignal'; //importado para utilizar o recurso nativo de notificações (Push Notification)

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    
    //utilizado para possibilitar o uso de requisições http no componente carro.
    HttpClientModule,

    //Importa o modulo principal da aplicação e executa o método (forRoot) 
    //para determinar qual é o componente principal que inicializa o app.
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ //configurações do módulo:
      name: 'aluracar', //nome da aplicação que o storage vai funcionar
      storeName: 'agendamentos', //nome da tabela do storage
      driverOrder: ['indexeddb'] //bancos desejados para trabalhar, neste app será apenas o indexeddb
    }) //Módulo de storage do Ionic 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosServiceProvider,
    AgendamentoServiceProvider,
    AgendamentoDaoProvider,
    UsuariosServiceProvider,
    ApiServiceProvider,
    Vibration,
    DatePicker,
    Camera,
    OneSignal
  ]
})
export class AppModule {}
