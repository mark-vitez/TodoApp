import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTTP_ACTIONS, HTTP_STATE } from 'src/app/constants';
import { ITodoList, ITodoListResponse } from 'src/app/models/ITodoList';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  public listId: number;
  public listLoading: boolean = false;
  public todoList: ITodoList;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _userService:UserService,
    private _httpService: HttpService){}
  

  ngOnInit(): void {
    var routerSnaphot = this._activatedRoute.snapshot;
    this.listId = Number(routerSnaphot.paramMap.get('id'));
    this._loadList();
  }

  private _loadList(){
    this.listLoading = true;
    this._httpService.getRequest<ITodoListResponse>(HTTP_ACTIONS.GET_LIST,{'userId':this._userService.user.userId, 'listId':this.listId}).subscribe( res => {     
      if(res.state === HTTP_STATE.SUCCESS){        
        this.todoList = res.data;
        this.listLoading = false;
      }
      
    })
  }

  ngOnDestroy(): void {
      console.log('component destroyed');      
  }

}
