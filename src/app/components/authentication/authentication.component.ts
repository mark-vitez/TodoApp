import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ILoginModel } from 'src/app/models/login-model';
import { GlobalEvents } from 'src/app/services/globalEvents';
import { HttpService } from 'src/app/services/http.service';
import { AuthenticationType } from './models/AuthType';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('loginTitle') loginTitle: ElementRef;
  @ViewChild('registrationTitle') regTitle: ElementRef;

  public isLogin: boolean = true;


  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
  }

  selectAuthType(type: AuthenticationType) {
    console.log(type);

    if (type === AuthenticationType.LOGIN && !this.isLogin) {
      this.isLogin = true;
      this.loginTitle.nativeElement.classList.add('active');
      this.regTitle.nativeElement.classList.remove('active');
    } else if (type === AuthenticationType.REGISTER && this.login) {
      this.isLogin = false;
      this.loginTitle.nativeElement.classList.remove('active');
      this.regTitle.nativeElement.classList.add('active');
    }
  }

  login(loginModel: ILoginModel) {
    this._httpService.loginUser(loginModel);
  }

  public clickSubmit() {
    var button = document.querySelector<HTMLButtonElement>("#submitBtn")?.click();
  }
}

