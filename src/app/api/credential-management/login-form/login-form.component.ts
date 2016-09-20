import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  @Output('form') onSubmit:EventEmitter<any>;
  @Output('google') onGSubmit:EventEmitter<any>;
  constructor() {
    this.onSubmit=new EventEmitter<any>();
    this.onGSubmit=new EventEmitter<any>();
  }

  ngOnInit() {
  }

  login(values){
    this.onSubmit.emit(values);
  }

  googleLogin(){
    this.onGSubmit.emit();
  }
}
