import { Injectable } from '@angular/core';
import { CredentialProvider } from './types';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GoogleProviderService implements CredentialProvider{

  public static GOOGLE_SIGNIN = 'https://accounts.google.com';

  constructor(private cred) {}

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

  login(id){
    return this.proceedLogin(id)
      .flatMap(googleUser=>this.storeCredentials(googleUser));
  }

  proceedLogin(id){
    // Return Promise after Facebook Login dance.
    var promise = (function () {
      var auth2 = (<ExtendedWindow>window).gapi.auth2.getAuthInstance();
      if (auth2.isSignedIn.get()) {
        // Check if currently signed in user is the same as intended.
        var googleUser = auth2.currentUser.get();
        if (googleUser.getBasicProfile().getEmail() === id) {
          return Promise.resolve(googleUser);
        }
      }
      // If the user is not signed in with expected account, let sign in.
      return auth2.signIn({
        // Set `login_hint` to specify an intended user account,
        // otherwise user selection dialog will popup.
        login_hint: id || ''
      });
    })().then(googleUser=> {
      return googleUser;
    });
    return this.toObservable(promise);
  }

  storeCredentials(googleUser){
    let user={
      id: googleUser.getBasicProfile().getId(),
      username: googleUser.getBasicProfile().getName(),
      firstname: googleUser.getBasicProfile().getGivenName(),
      lastname: googleUser.getBasicProfile().getFamilyName(),
      iconURL: googleUser.getBasicProfile().getImageUrl() || ''
    };
    let cred = new (<ExtendedWindow>window).FederatedCredential({
      id: googleUser.getBasicProfile().getId(),
      name: googleUser.getBasicProfile().getName(),
      iconURL: googleUser.getBasicProfile().getImageUrl() || '',
      provider: GoogleProviderService.GOOGLE_SIGNIN
    });
    var promise = this.cred.store(cred).then(()=>user);
    return this.toObservable(promise);
  }
}
