import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() size: number = 20;
  constructor() { }

  ngOnInit(): void {
    let root = document.documentElement;
    root.style.setProperty('--loader-width', `${this.size}px`)
  }

}
