import { Component, OnInit } from '@angular/core';
import { HTTP_ACTIONS, HTTP_STATE } from 'src/app/constants';
import { ITodoList, ITodoListsResponse } from 'src/app/models/ITodoList';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public numbers = [0,0,0,0,0,0,0,0];

  public todoLists: ITodoList[];

  constructor(private _httpService: HttpService, private _userService:UserService) { }

  ngOnInit(): void {
      this._httpService.getRequest<ITodoListsResponse>(HTTP_ACTIONS.GET_USER_LISTS, {'userId':this._userService.user.userId} ).subscribe(res => {
      if(res.successState === HTTP_STATE.SUCCESS){
        this.todoLists = [...res.data,...res.data,...res.data,...res.data,...res.data,...res.data,...res.data];
      }
    })
  }

}
