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

  login(){
    console.log(this.email+"-"+this.password);
    if(!this.email || !this.password){
      alert("please fill out every form");
      return;
    }
    
    console.log("OK response");
    

    //this._httpService.ping();
  }
}
