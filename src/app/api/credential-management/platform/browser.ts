import { Injectable } from '@angular/core';

@Injectable()
export class BrowserWebCredentials {

  private _cred;

  constructor() {
    this._cred = (<ExtendedNavigator>navigator).credentials;
  }

  getCredentials(){
    return this._cred;
  }


}
