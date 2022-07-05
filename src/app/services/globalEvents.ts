import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { ILoginResponse } from '../models/login-response';
import { ILoginModel } from '../models/login-model';
import { HTTP_STATE, LOCAL_STORAGE_KEYS } from '../constants';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GlobalEvents {

    public userLoggedIn = new BehaviorSubject(false);

    constructor() {
    }
}
