import { Component, OnInit } from '@angular/core';
import { HTTP_ACTIONS } from 'src/app/constants';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public numbers = [0,0,0,0,0,0,0,0];

  constructor(private _httpService: HttpService, private _userService:UserService) { }

  ngOnInit(): void {
    this._httpService.getRequest(HTTP_ACTIONS.GET_USER_LISTS, {'userId':this._userService.user.userId} ).subscribe(res => {
      console.log(res);
      console.log(this._userService.user);
      
    })
  }

}
