import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceProvider } from '../api-service/api-service';

@Injectable()
export class AgendamentoServiceProvider {

  _url: string;

  constructor(private _http: HttpClient,
              private _api: ApiServiceProvider) { 
    this._url = this._api.url; 
  }

  agenda(agendamento) {
    return this._http
              .post(this._url+'/agendamento/agenda',agendamento)
              .do(() => agendamento.enviado = true) //altera a propriedade pra "true" apos o agendamento realizado com sucesso.
              .catch((err) => Observable.of(new Error('Falha no agendamento! Tente novamente mais tarde!')) );
  }
}
