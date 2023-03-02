import { trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, AfterViewInit {

  @Input() question: string = 'Are you sure?';
  @ViewChild('trigger') button: ElementRef;  

  @Output() dialogChoice = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.button.nativeElement.click();
  }

  public sendConfirmation(choice: boolean) {
    this.dialogChoice.emit(choice);
  }
}
