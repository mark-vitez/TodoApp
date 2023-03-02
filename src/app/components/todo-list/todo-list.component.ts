import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP_ACTIONS, HTTP_STATE } from 'src/app/constants';
import { ITodoTask } from 'src/app/models';
import { ICreateTaskResponse } from 'src/app/models/ICreateTaskResponse';
import { INoContentResponse } from 'src/app/models/INoContentResponse';
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
  public showCreateTaskDialog: boolean = false;
  public tasks: ITodoTask[];

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _router: Router,
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
        this.tasks = [...res.data.tasks];
        this.listLoading = false;
      }
      
    })
  }

  ngOnDestroy(): void {
      console.log('component destroyed');
  }

  public deleteList(){
    this._httpService.deleteRequest<INoContentResponse>(HTTP_ACTIONS.DELETE_LIST,{'userId':this._userService.user.userId, 'listId': this.listId}).subscribe( res => {     
      if(res.state == HTTP_STATE.SUCCESS){
        this._router.navigate(['home'])
      }
    })
  }

  public openTaskCreationDialog():void{
    this.showCreateTaskDialog = true;
  }

  public closeDialog(data: string|null){
    if(data){
      this._httpService.postRequest<ICreateTaskResponse>(HTTP_ACTIONS.CREATE_TASK,{'listId':this.listId, 'description': data}).subscribe( res => {     
        if(res.state == HTTP_STATE.SUCCESS){
          this._loadList();
        }else{

        }
      })
    }
    this.showCreateTaskDialog = false;
  }

  public goBack(){
    this._router.navigate(["home"])
  }
}