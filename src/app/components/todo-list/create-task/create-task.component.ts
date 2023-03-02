import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit,AfterViewInit {

  @ViewChild('taskDialogTrigger') button: ElementRef;
  @ViewChild('closeDialog') closeButtonRef: ElementRef;

  @Output() dialogCloseEvent: EventEmitter<string | null> = new EventEmitter();

  public taskDescription: string;

  ngAfterViewInit(): void {
    this.button.nativeElement.click();    
  }

  constructor(private _messageService:MessageService) {
  }

  ngOnInit(): void {
  }

  cancel(): void{
    this.dialogCloseEvent.emit(null);
    this._close();
  }

  sendData(): void{
    if(this.taskDescription){
      console.log(this.taskDescription);
      this.dialogCloseEvent.emit(this.taskDescription); 
      this._close();
    }else{
      this._messageService.WarningMessage("You need to add a task description.");
    } 
  }

  private _close(){
    this.closeButtonRef.nativeElement.click();
  }

}
