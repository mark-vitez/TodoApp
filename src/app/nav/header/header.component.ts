import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserModel } from 'src/app/models/IUserModel';
import { GlobalEvents } from 'src/app/services/globalEvents';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public showConfDialog = false;

  constructor(private _userService: UserService, private _events: GlobalEvents) { }

  ngOnInit(): void {
    this._events.userLoggedIn.subscribe( isLoggedIn => {
      console.log('login status changed');
      
      this.isLoggedIn = isLoggedIn;
    })
  }

  public logoutClicked(){
    console.log('logout clicked');    
    this.showConfDialog = true;
  }

  public handleDialogResponse(response: boolean){
    if(response){
      this.showConfDialog = false;
      this._userService.logOut();
    }
  }

}
