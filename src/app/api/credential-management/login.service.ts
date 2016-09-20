import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CredentialCoreService } from './credential-core';
import { BrowserWebCredentials } from './platform';
import { LoginConfig } from './config';
@Injectable()
export class LoginService {

  public hasCredentialEnable:boolean;
  public hasCredentials:boolean;

  constructor(private http:Http, private credentialService:CredentialCoreService) {
    //Register Config on credential service
    this.credentialService.config=LoginConfig;
    this.hasCredentialEnable=this.credentialService.hasCredentialEnable();
    this.credentialService.getCredentials().subscribe(cred=> {
      if (cred) {
        this.hasCredentials=true;
      }
    });
  }


  login(values){
    if(this.hasCredentialEnable){
     return this.credentialService.onPwSignIn(values);
    }
    else{
      //MANUAL FALLBACK
      return this.authenticateWithServer(values);
    }
  }

  googleLogin(){
    return this.credentialService.onGSignIn();
  }

  authenticateWithServer = function(values) {
    var url = LoginConfig.SERVER_LOGIN_URL;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,values,{
        headers: headers
      })
      .map(res=>res.json())
      .flatMap(user=>this.storeCredentials(user))
  };



  serverLogin(form){
    return this.fakeResponse();
  }

  logout(){

  }


  /**
   * Mock an authentication flow with our own server
   * @param  {FormData} form FormData to POST to the server
   * @return {Promise} Resolves when successfully authenticated
   */
  fakeResponse(){
    let response={
      id:'cbalit',
      firstname:"Cyril",
      lastname:"Balit"
    };
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(response);
      },200)
    });
  }
}
