import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { ILoginResponse } from '../models/login-response';
import { ILoginModel } from '../models/login-model';
import { HTTP_STATE, LOCAL_STORAGE_KEYS } from '../constants';
import { environment } from 'src/environments/environment';
import { IUserModel } from '../models/IUserModel';
import { UserService } from './user.service';
import { getLocaleDirection } from '@angular/common';
import { IRegistrationModel, IRegistrationResponse } from '../models/registration-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _apiBaseUrl: string = environment.apiUrl;

  constructor(private _httpClient: HttpClient,
        private _userService: UserService, ) {

  }

  ping() {
    return this._httpClient.get(this._apiBaseUrl + '/account/ping').subscribe(resp => {
      console.log(resp);
    });
  }

  public loginUser(loginData: ILoginModel) {
    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/login', loginData);
  }

  
  public registerUser(regData: IRegistrationModel) {
    return this._httpClient.post<IRegistrationResponse>(this._apiBaseUrl + '/account/register', regData);
  }


  getRequest<T>(getAction: string, params?: any) {    
    return this._httpClient.get<T>(this._apiBaseUrl + getAction, {params:params});
  }

}
