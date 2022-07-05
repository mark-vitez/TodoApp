import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITodoList } from 'src/app/models/ITodoList';

@Component({
  selector: 'app-todo-list-card',
  templateUrl: './todo-list-card.component..html',
  styleUrls: ['./todo-list-card.component..scss']
})
export class TodoListCardComponent implements OnInit {

  @Input() todoList: ITodoList

  constructor(private _router: Router) {     
  }

  ngOnInit(): void {
  }

  public openList(listId: number){
    console.log(listId);
    this._router.navigate(['todolist',listId])
  }

}
