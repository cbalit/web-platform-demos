import { Injectable } from '@angular/core';
import { BrowserWebCredentials } from '../platform';
import { Credentials, PasswordCredential} from './types';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class CredentialCoreService {

  private cred:Credentials;
  constructor(private _webCred: BrowserWebCredentials ) {
    this.cred=_webCred.getCredentials();
  }


  hasCredentialEnable() {
    return !!this.cred;
  }

  getCredentials(){
    return this.cred.get({
      password:true
    });
  }

  storeCredentials(form){
    let cred=new (<ExtendedWindow>window).PasswordCredential(form);
    return this.cred.store(cred);
  }

  logout(){
    this.cred.requireUserMediation();
  }


}
