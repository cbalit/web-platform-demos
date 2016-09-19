import { Injectable } from '@angular/core';
import { CredentialCoreService } from './credential-core';
import { BrowserWebCredentials } from './platform';

@Injectable()
export class LoginService {

  public hasCredentialEnable:boolean;
  public hasCredentials:boolean;

  constructor(private credentialService:CredentialCoreService) {
    this.hasCredentialEnable=this.credentialService.hasCredentialEnable();
    this.credentialService.getCredentials().then(cred=> {
      if (cred) {
        this.hasCredentials=true;
      }
    });
  }


  login(form){

    return this.credentialService.getCredentials().then(cred=>{
      if(cred){
        //do login
        console.log("credentials");
        return this.serverLoginWithCredentials(cred).then((user)=>{
          return user;
        })
      }
      else{
        console.log("no credentials");
        return this.serverLogin(form).then((user)=>{
          let cred={
            id:form.get('id'),
            username:form.get('username'),
            password:form.get('password')
          };
          return this.credentialService.storeCredentials(cred).then(()=>{
            return user;
          })
        })
      }
    })
  }


  serverLoginWithCredentials(cred){
    return this.fakeResponse();
  }

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
