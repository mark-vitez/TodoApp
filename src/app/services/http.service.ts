import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ILoginResponse } from '../models/login-response';
import { ILoginModel } from '../models/login-model';
import { HTTP_STATE, LOCAL_STORAGE_KEYS } from '../constants';
import { environment } from 'src/environments/environment';
import { IUserModel } from '../models/IUserModel';
import { UserService } from './user.service';
import { getLocaleDirection } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _apiBaseUrl: string = environment.apiUrl;

  constructor(private _httpClient: HttpClient,
        private _userService: UserService) {

  }

  ping() {
    return this._httpClient.get(this._apiBaseUrl + '/account/ping').subscribe(resp => {
      console.log(resp);
    });
  }

  loginUser(loginData: ILoginModel) {

    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/login', loginData).subscribe(res => {
      console.log(res);

      if (res.state === HTTP_STATE.SUCCESS) {
        let user: IUserModel = res.data;
        this._userService.saveUser(user);
      }
    });
  }

  getRequest(getAction: string, params?: any) {    
    return this._httpClient.get(this._apiBaseUrl + getAction, {params:params});
  }

}
