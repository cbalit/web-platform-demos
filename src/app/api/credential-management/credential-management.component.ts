import { Component, OnInit, NgZone } from '@angular/core';
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

  constructor(private loginService:LoginService,private _zone: NgZone) { }

  ngOnInit() {
    this.canUse=this.loginService.hasCredentialEnable;
  }

  tryLogin(){
    this.loginService.getCredentials().subscribe(cred=>{
      if(cred){
        this.loginService.autologin(cred).subscribe(user=>{
          this._zone.run( () =>  {
            // force change detection
            this.user=user;
            this.displayForm=false;
          });
        });
      }
      else{
        this.displayForm=true;
      }
    });
  }


  login(values){
    this.loginService.login(values).subscribe(user=>{
      this.user=user;
      this.displayForm=false;
    });
  }

  googleLogin(){
    this.loginService.googleLogin().subscribe(user=>{
      this._zone.run( () =>  {
        // force change detection
        this.user=user;
        this.displayForm=false;
      });
    });
  }


  logout(){
    this.loginService.logout().subscribe(()=>{
      this.hasCredentials=false;
      this.user=null;
    });
  }

}
