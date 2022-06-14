import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observer } from 'rxjs';
import { ILoginResponse } from '../models/login-response';
import { ILoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _apiBaseUrl: string = 'http://likeable.v4y.hu/todoapi/api';

  constructor(private _httpClient:HttpClient) {

  }

  ping(){
    return this._httpClient.get(this._apiBaseUrl + '/account/ping').subscribe( resp => {
      console.log(resp);      
    });
  }

  loginUser(){
    var loginInfo: ILoginModel = {      
        email: "user@example.com",
        password: "P@ssword1"      
    }
    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/login',loginInfo).subscribe( resp => {
      console.log(resp);      
    });
  }
}
