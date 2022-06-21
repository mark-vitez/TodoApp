import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILoginModel } from 'src/app/models/login-model';
import { GlobalEvents } from 'src/app/services/globalEvents';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  @Output() userInfo = new EventEmitter<ILoginModel>();

  constructor() { }

  ngOnInit(): void {
  }

  public sendLoginInfo() {
    this.userInfo.emit({ email: this.email, password: this.password });
  }

  public clickSubmit() {
    var button = document.querySelector<HTMLButtonElement>("#submitBtn").click();
  }
}
