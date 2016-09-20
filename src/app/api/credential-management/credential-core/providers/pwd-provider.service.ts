import { Injectable } from '@angular/core';
import { CredentialProvider } from './types';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PwdProviderService implements CredentialProvider{

  constructor(private cred, private http:Http, private url:string) {}

  /**
   * A helper function that transforms any Promise into an Observable
   *
   * @param  {Promise<any>}    promise incoming promise
   * @return {Observable<any>}         outgoing observable
   */
  toObservable(promise:Promise<any>):Observable<any> {
    return Observable.fromPromise(promise)
  }

  getCredentials() {
    var promise = this.cred.get({
      password: true
    });
    return this.toObservable(promise);
  }

  login(values){
    let form = new FormData();
    form.append('id', values.username);
    form.append('username', values.username);
    form.append('password', values.password);
    return this.proceedLogin(form)
      .flatMap(user=>this.storeCredentials({form:values, profile:user}));
  }

  proceedLogin(cred){
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(this.url, cred, {
        headers: headers
      })
      .map(res=>res.json());
  }

  storeCredentials(datas){
    let form=datas.form;
    let user=datas.profile;
    form.name = user.lastname;
    form.id = user.id;
    let cred = new (<ExtendedWindow>window).PasswordCredential(form);
    var promise = this.cred.store(cred).then(()=>user);
    return this.toObservable(promise);
  }
}
