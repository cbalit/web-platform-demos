import { Injectable } from '@angular/core';
import { BrowserWebCredentials } from '../platform';
import { Http, Headers } from '@angular/http';
import { Credentials, PasswordCredential} from './types';
import { Observable } from 'rxjs/Observable';
import { PwdProviderService } from './providers';
import { GoogleProviderService } from './providers';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class CredentialCoreService {

  public GOOGLE_SIGNIN = 'https://accounts.google.com';
  public FACEBOOK_LOGIN = 'https://www.facebook.com';

  private cred:Credentials;
  private _config;
  /**
   * A helper function that transforms any Promise into an Observable
   *
   * @param  {Promise<any>}    promise incoming promise
   * @return {Observable<any>}         outgoing observable
   */
  toObservable(promise:Promise<any>):Observable<any> {
    return Observable.fromPromise(promise)
  }

  constructor(private _webCred:BrowserWebCredentials, private http:Http) {
    this.cred = _webCred.getCredentials();
  }


  public set config(c) {
    this._config = c;
  }

  hasCredentialEnable() {
    return !!this.cred;
  }

  getCredentials() {
    var promise = this.cred.get({
      password: true,
      federated: {
        providers: [
          this.GOOGLE_SIGNIN,
          this.FACEBOOK_LOGIN
        ]
      }
    });
    return this.toObservable(promise);
  }


  onPwSignIn(values) {
    let pwdProvider=new PwdProviderService(this.cred,this.http,this._config.SERVER_LOGIN_URL);
    return pwdProvider.login(values);
  }


  onGSignIn() {
    let provider=new GoogleProviderService(this.cred);
    return provider.login('');
  }


  logout() {
    var promise = this.cred.requireUserMediation();
    return this.toObservable(promise);
  }


}
