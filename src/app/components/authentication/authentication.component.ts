import { getLocaleFirstDayOfWeek } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HTTP_STATE } from "src/app/constants";
import { IUserModel } from "src/app/models/IUserModel";
import { ILoginModel } from "src/app/models/login-model";
import { IRegistrationModel } from "src/app/models/registration-model";
import { HttpService } from "src/app/services/http.service";
import { MessageService } from "src/app/services/message.service";
import { UserService } from "src/app/services/user.service";
import { AuthenticationType } from "./models/AuthType";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"],
})
export class AuthenticationComponent implements OnInit {
  @ViewChild("loginTitle") loginTitle: ElementRef;
  @ViewChild("registrationTitle") regTitle: ElementRef;

  public isLogin: boolean = true;
  public buttonLabel = "Login";

  private _emailValidationRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  private _passwordValidationRegex = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/;

  constructor(
    private _httpService: HttpService,
    private _userService: UserService,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {}

  selectAuthType(type: AuthenticationType) {
    console.log(type);

    if (type === AuthenticationType.LOGIN && !this.isLogin) {
      this.isLogin = true;
      this.loginTitle.nativeElement.classList.add("active");
      this.regTitle.nativeElement.classList.remove("active");
      this.buttonLabel = "Login";
    } else if (type === AuthenticationType.REGISTER && this.login) {
      this.isLogin = false;
      this.loginTitle.nativeElement.classList.remove("active");
      this.regTitle.nativeElement.classList.add("active");
      this.buttonLabel = "Registration";
    }
  }

  public login(loginModel: ILoginModel) {
    const isValid = this._validateFields(loginModel.email, loginModel.password);
    if (!isValid) return;

    this._httpService.loginUser(loginModel).subscribe((res) => {
      console.log(res);

      if (res.state === HTTP_STATE.SUCCESS) {
        let user: IUserModel = res.data;
        this._userService.saveUser(user);
        this._router.navigate(["home"]);
      } else {
        this._messageService.WarningMessage("Invalid credentials");
      }
    });
  }

  public register(registrationModel: IRegistrationModel) {
    const isValid = this._validateFields(
      registrationModel.email,
      registrationModel.password,
      true
    );
    if (!isValid) return;
    this._httpService.registerUser(registrationModel).subscribe((res) => {
      if (res.state === HTTP_STATE.SUCCESS) {
        this.login({
          email: registrationModel.email,
          password: registrationModel.password,
        });
      }
    });
  }

  private _validateFields(
    email: string,
    password: string,
    fullValidation: boolean = false
  ): boolean {
    var isValid = true;

    if (!email) {
      this._messageService.WarningMessage("Email can't be empty!");
      isValid = false;
    } else if (fullValidation && !this._emailValidationRegex.test(email)) {
      this._messageService.WarningMessage("Invalid email address!");
      isValid = false;
    }

    if (!password) {
      this._messageService.WarningMessage("Password can't be empty!");
      isValid = false;
    } else if (
      fullValidation &&
      !this._passwordValidationRegex.test(password)
    ) {
      this._messageService.WarningMessage(
        "Password must be at least 8 characters long, and it must contain at least an upper case letter, a lower case letter a number and a special character!!"
      );
      isValid = false;
    }

    return isValid;
  }

  public clickSubmit() {
    document.querySelector<HTMLButtonElement>("#submitBtn")?.click();
  }
}
