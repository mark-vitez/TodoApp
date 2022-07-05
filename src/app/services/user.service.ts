import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { IUserModel } from '../models/IUserModel';
import { GlobalEvents } from './globalEvents';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user?: IUserModel;

    constructor(private _router: Router, private _events :GlobalEvents) {
        let user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
        console.log('user init');
        
        if(!user){
            console.log('user not found');            
            this.user = null;
            _events.userLoggedIn.next(false);
        } else {
            this.user = JSON.parse(user);
            _events.userLoggedIn.next(true);
        }
    }

    get isUserLogedIn(){
        var loginStatus = this.user !== null;
        
        return this.user !== null;
    }

    public saveUser(user: IUserModel){
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
        this.user = user;
        this._events.userLoggedIn.next(true);
    }

    public refreshToken( token: string, refreshToken: string){
        this.user.token = token,
        this.user.refreshToken = refreshToken,
        this.saveUser(this.user);
    }

    public getAccessToken(){
        return this.user?.token;
    }

    public getRefreshToken(){
        return this.user?.refreshToken;
    }

    public logOut(){
        this.user = null;
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
        this._router.navigate(['login']);
        this._events.userLoggedIn.next(false);
    }

}
