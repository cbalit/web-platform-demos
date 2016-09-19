import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';


@Component({
  moduleId: module.id,
  selector: 'app-credential-management',
  templateUrl: 'credential-management.component.html',
  styleUrls: ['credential-management.component.css']
})
export class CredentialManagementComponent implements OnInit {

  private canUse:boolean;
  private hasCredentials:boolean;
  private displayForm=false;

  private username:string;
  private password:string;
  private user:Object;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.canUse=this.loginService.hasCredentialEnable;
    this.hasCredentials=this.loginService.hasCredentials;
  }

  tryLogin(){
    if(this.hasCredentials){

    }
    else{
      this.displayForm=true;
    }
  }

  login(values){
    let form = new FormData();
    form.append('id',values.username);
    form.append('username',values.username);
    form.append('password',values.password);


    this.loginService.login(form).then(user=>{
      this.user=user;
      this.displayForm=false;
    });
  }

  logout(){
    this.loginService.logout();
    this.hasCredentials=false;
    this.user=null;
  }

}
