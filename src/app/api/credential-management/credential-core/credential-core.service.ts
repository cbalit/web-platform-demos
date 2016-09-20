import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Credentials } from './types';
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

  public static GOOGLE_SIGNIN = 'https://accounts.google.com';
  public static FACEBOOK_LOGIN = 'https://www.facebook.com';

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

  constructor(private http:Http) {
    this.cred = (<ExtendedNavigator>navigator).credentials;
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
          CredentialCoreService.GOOGLE_SIGNIN,
          CredentialCoreService.FACEBOOK_LOGIN
        ]
      }
    });
    return this.toObservable(promise);
  }

  autologin(cred){
    let provider;
    switch (cred.type) {
      case 'password':
            provider=new PwdProviderService(this.cred,this.http,this._config.SERVER_LOGIN_URL);
            break;
      case 'federated':
        switch (cred.provider) {
          case CredentialCoreService.GOOGLE_SIGNIN:
            // Return Promise from `gSignIn`
            provider=new GoogleProviderService(this.cred);
            break;
          case CredentialCoreService.FACEBOOK_LOGIN:
            break;
        }
        break;
    }
    return provider.autologin(cred);
  }


  onPwSignIn(values) {
    let provider=new PwdProviderService(this.cred,this.http,this._config.SERVER_LOGIN_URL);
    return provider.login(values);
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
