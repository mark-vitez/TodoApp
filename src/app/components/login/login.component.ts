import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(private _httpService:HttpService) { }

  ngOnInit(): void {
    
  }

  getLists(){
    this._httpService.getRequest('');
  }

  login(){
    this._httpService.loginUser();    
  }

  refreshToken(){
    this._httpService.refreshToken();
  }
}
