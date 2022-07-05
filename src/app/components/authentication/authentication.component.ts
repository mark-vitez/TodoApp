import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_STATE } from 'src/app/constants';
import { IUserModel } from 'src/app/models/IUserModel';
import { ILoginModel } from 'src/app/models/login-model';
import { IRegistrationModel } from 'src/app/models/registration-model';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
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
  public buttonLabel = 'Login';

  constructor(
    private _httpService: HttpService,
    private _userService:UserService,
    private _router:Router) { }

  ngOnInit(): void {
  }



  selectAuthType(type: AuthenticationType) {
    console.log(type);

    if (type === AuthenticationType.LOGIN && !this.isLogin) {
      this.isLogin = true;
      this.loginTitle.nativeElement.classList.add('active');
      this.regTitle.nativeElement.classList.remove('active');
      this.buttonLabel = "Login";
    } else if (type === AuthenticationType.REGISTER && this.login) {
      this.isLogin = false;
      this.loginTitle.nativeElement.classList.remove('active');
      this.regTitle.nativeElement.classList.add('active');
      this.buttonLabel = "Registration";
    }
  }

  public login(loginModel: ILoginModel) {
    this._httpService.loginUser(loginModel).subscribe(res => {
      console.log(res);

      if (res.state === HTTP_STATE.SUCCESS) {
        let user: IUserModel = res.data;
        this._userService.saveUser(user);
        this._router.navigate(['home']);
      } else {
        alert('login failed try again');
      }
    });;
  }  

  public register(registrationModel: IRegistrationModel) {
    this._httpService.registerUser(registrationModel).subscribe( res => {
      if(res.state === HTTP_STATE.SUCCESS){
        this.login({email:registrationModel.email, password: registrationModel.password});
      }
    })
  }

  public clickSubmit() {
    document.querySelector<HTMLButtonElement>("#submitBtn")?.click();
  }
}

