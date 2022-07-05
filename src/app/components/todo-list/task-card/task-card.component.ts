import { Component, Input, OnInit } from '@angular/core';
import { ITodoTask } from 'src/app/models/ITodoTask';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task: ITodoTask
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
