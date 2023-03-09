import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit, AfterViewInit {

  @ViewChild('listDialogTrigger') button: ElementRef;
  @ViewChild('closeDialog') closeButtonRef: ElementRef;

  @Output() dialogCloseEvent: EventEmitter<string | null> = new EventEmitter();

  public listName: string;

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
    if(this.listName){
      this.dialogCloseEvent.emit(this.listName); 
      this._close();
    }else{
      this._messageService.WarningMessage("Please name your list.");
    } 
  }

  private _close(){
    this.closeButtonRef.nativeElement.click();
  }

}
