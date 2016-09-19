import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  @Output() onSubmit:EventEmitter<any>;
  constructor() {
    this.onSubmit=new EventEmitter<any>();
  }

  ngOnInit() {
  }

  login(values){
    this.onSubmit.emit(values);
  }
}
