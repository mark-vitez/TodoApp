import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ILoginResponse } from '../models/login-response';
import { ILoginModel } from '../models/login-model';
import { HTTP_STATE, LOCAL_STORAGE_KEYS } from '../constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _apiBaseUrl: string = environment.apiUrl;

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
    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/login', loginInfo).subscribe( res => {
      console.log(res);
      
      if(res.state === HTTP_STATE.SUCCESS){
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data.token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, res.data.refreshToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID,res.data.userId);
      }
    });
  }

  refreshToken(){
    let data = {
      userId: localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID),
      token: localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
      refreshToken: localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    }
    console.log('=============');
    
    console.log(data);

    console.log('=============');
    
    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/refreshToken', data).subscribe( res => {
    console.log(res);    
    if(res.state === HTTP_STATE.SUCCESS){
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data.token);
      console.log(res.data.token);
      
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, res.data.refreshToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID,res.data.userId);
    }
  });

  }

  getRequest( getAction:string ,params?: any){

    this._httpClient.get(this._apiBaseUrl + '/TodoLists').subscribe(res => {console.log(res);
    })  
  }
 
  
}
