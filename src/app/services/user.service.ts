import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { IUserModel } from '../models/IUserModel';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user: IUserModel;

    constructor() {
        let user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
        if(!user){
            this.user = null;
        } else {
            this.user = JSON.parse(user);
        }
    }

    get isUserLogedIn(){
        return this.user === null;
    }

    public saveUser(user: IUserModel){
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
        this.user = user;
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

}
