import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer, of } from "rxjs";
import { ILoginResponse } from "../models/login-response";
import { ILoginModel } from "../models/login-model";
import { HTTP_STATE, LOCAL_STORAGE_KEYS } from "../constants";
import { environment } from "src/environments/environment";
import { IUserModel } from "../models/IUserModel";
import { UserService } from "./user.service";
import { getLocaleDirection } from "@angular/common";
import {
  IRegistrationModel,
  IRegistrationResponse,
} from "../models/registration-model";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private _apiBaseUrl: string = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {}

  ping() {
    return this._httpClient
      .get(this._apiBaseUrl + "/authentication/ping")
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  public loginUser(loginData: ILoginModel) {
    return this._httpClient.post<ILoginResponse>(
      this._apiBaseUrl + "/authentication/login",
      loginData
    );
  }

  public registerUser(regData: IRegistrationModel) {
    return this._httpClient.post<IRegistrationResponse>(
      this._apiBaseUrl + "/authentication/register",
      regData
    );
  }

  postRequest<T>(action: string, data?: any) {
    return this._httpClient.post<T>(this._apiBaseUrl + action, data);
  }

  getRequest<T>(action: string, params?: any) {
    return this._httpClient.get<T>(this._apiBaseUrl + action, {
      params: params,
    });
  }

  deleteRequest<T>(action: string, params?: any) {
    return this._httpClient.delete<T>(this._apiBaseUrl + action, {
      params: params,
    });
  }

  patchRequest<T>(action: string, data?: any, params?: any) {
    return this._httpClient.patch<T>(this._apiBaseUrl + action, data);
  }
}
