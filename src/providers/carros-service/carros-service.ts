import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../../modelos/carro';
import { ApiServiceProvider } from '../api-service/api-service';

@Injectable()
export class CarrosServiceProvider {
  _url: string;

  constructor(private _http: HttpClient,
              private _api: ApiServiceProvider) {
    this._url = this._api.url;
  }

  lista(){
    return this._http.get<Carro[]>(this._url+'/carro/listaTodos')
  }

}
