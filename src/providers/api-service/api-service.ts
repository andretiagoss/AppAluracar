import { Injectable } from '@angular/core';

@Injectable()
export class ApiServiceProvider {

  // Quando for necessário, aqui será o único lugar a ser modificado!
  private _url: string = 'https://andretiagoss.azurewebsites.net/api';

  get url() {
    return this._url;
  }

}
