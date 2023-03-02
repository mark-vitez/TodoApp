import { HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { tap, catchError, filter, take, switchMap } from "rxjs/operators"
import { environment } from "src/environments/environment";
import { HttpStatusCode, HTTP_STATE, LOCAL_STORAGE_KEYS } from "../constants";
import { ILoginResponse } from "../models/login-response";
import { GlobalEvents } from "../services/globalEvents";
import { UserService } from "../services/user.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private _apiBaseUrl: string = environment.apiUrl;
  private _isRetry = false;



  constructor(private _httpClient: HttpClient, private _userSevice: UserService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    var token = this._userSevice.getAccessToken();
    if (token) {

      console.log(token);
      token = `Bearer ${token}`
      var newReq = req.clone({ setHeaders: { "Authorization": token } });     
      return next.handle(newReq).pipe(
        catchError((err) => {
          console.error(err);          
          if (err.status === HttpStatusCode.UNAUTHORIZED) {
            console.log('Token expired');
            console.warn(err.url);        
            return this._refreshTokenAndRepeatReq(req, next);
          }else if(err.status === 400 && err.url.includes('refreshToken')) {
            this._userSevice.logOut();            
          }
          return of(err)
        }),

        tap(evt => {      
          if(evt.type === HttpEventType.Response){
            console.log(evt['body']);          
          }
        })
        );
    }

    return next.handle(req).pipe(
      tap(evt => {
        if(evt.type === HttpEventType.Response){
          console.log(evt['body']);          
        }
      }),
      catchError(err => {
        console.log('Pls log in');
        return of(err)
      })
    );

  }

  private _refreshTokenAndRepeatReq(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    let body = {
      userId: this._userSevice.user.userId,
      email: this._userSevice.user.email,
      token: this._userSevice.getAccessToken(),
      refreshToken: this._userSevice.getRefreshToken()
    }
    console.log('refresh');
    console.log(body);
    
    
    return this._httpClient.post<ILoginResponse>(this._apiBaseUrl + '/authentication/refreshToken', body, { responseType: "json" }).pipe(
      switchMap((res) => {
        console.log('refresh ');
        

        if (res.state === HTTP_STATE.SUCCESS) {
          this._userSevice.refreshToken(res.data.token,res.data.refreshToken);
          let token = `Bearer ${res.data.token}`;
          let newReq = req.clone({ setHeaders: { "Authorization": token } });
          return next.handle(newReq);
        } else {
          console.log('token refresh failed logging out');          
          this._userSevice.logOut();
          return of(null);
        }


      }),
      catchError((err) => {
        console.log(err);
        console.log('errr caught');
        
        return throwError(err);        
      })
    );
  }
}