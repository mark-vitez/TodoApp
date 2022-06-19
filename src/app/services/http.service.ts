import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ILoginResponse } from '../models/login-response';
import { ILoginModel } from '../models/login-model';
import { HTTP_STATE, LOCAL_STORAGE_KEYS } from '../constants';
import { environment } from 'src/environments/environment';
import { IUserModel } from '../models/IUserModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _apiBaseUrl: string = environment.apiUrl;

  constructor(private _httpClient: HttpClient) {

  }

  ping() {
    return this._httpClient.get(this._apiBaseUrl + '/account/ping').subscribe(resp => {
      console.log(resp);
    });
  }

  loginUser(loginData: ILoginModel) {
    var loginInfo: ILoginModel = {
      email: loginData.email,
      password: loginData.password
    }
    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/login', loginInfo).subscribe(res => {
      console.log(res);

      if (res.state === HTTP_STATE.SUCCESS) {
        let user: IUserModel = res.data;
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
      }
    });
  }

  refreshToken() {
    let data = JSON.parse(localStorage.get(LOCAL_STORAGE_KEYS.USER));
    console.log(data);

    console.log('=============');

    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/refreshToken', data).subscribe(res => {
      console.log(res);
      if (res.state === HTTP_STATE.SUCCESS) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data.accessToken);
        console.log(res.data.accessToken);

        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, res.data.refreshToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, res.data.userId);
      }
    });

  }

  getRequest(getAction: string, params?: any) {

    this._httpClient.get(this._apiBaseUrl + '/TodoLists').subscribe(res => {
      console.log(res);
    })
  }


}
