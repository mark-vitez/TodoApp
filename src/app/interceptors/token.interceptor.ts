import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, catchError, filter, take, switchMap } from "rxjs/operators"
import { environment } from "src/environments/environment";
import {  HttpStatusCode, HTTP_STATE, LOCAL_STORAGE_KEYS } from "../constants";
import { ILoginResponse } from "../models/login-response";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private _apiBaseUrl: string = environment.apiUrl;

  constructor(private _httpClient: HttpClient) {}

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {    
    
    var token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if(token){
      
      console.log(token);
      token = `Bearer ${token}`
      var newReq = req.clone({setHeaders: {"Authorization": token}});
        
      console.log(newReq);
      return next.handle(newReq).pipe(
        catchError((err) => {         
          if(err.status === HttpStatusCode.UNAUTHORIZED){
            console.log('Token expired');
            //return of(err)            
              return this._refreshTokenAndRepeatReq(req, next);
            
          }
          return of(err)
        }
      ));
    }

    return next.handle(req).pipe(      
      tap( evt => {
        console.log(evt);
      }),
      catchError( err => {
        console.log('Pls log in');
        return of(err)         
      })
    );
      
  }
  
  private _refreshTokenAndRepeatReq(    
    req: HttpRequest<any>, 
    next: HttpHandler): Observable<HttpEvent<any>>
    {   
    let body = {
        userId: localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID),
        token: localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
        refreshToken: localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    }
    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/account/refreshToken', body, {responseType:"json"}).pipe(
      switchMap( (res) => {
        if(res.state === HTTP_STATE.SUCCESS){
          localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, res.data.userId);
          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data.token);
          localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, res.data.refreshToken);
        }     
        let token = `Bearer ${res.data.token}`;
        let newReq = req.clone({setHeaders:{"Authorization": token}});      
        return next.handle(newReq);
      })
    );
  }
}