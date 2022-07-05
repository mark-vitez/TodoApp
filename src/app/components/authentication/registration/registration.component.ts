import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IRegistrationModel } from 'src/app/models/registration-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  @Output() registrationForm = new EventEmitter<IRegistrationModel>();

  constructor() { }

  ngOnInit(): void {
  }

  public register() {    

    if(this._fieldsValid()){
      this.registrationForm.emit({ 
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email, 
        password: this.password});
    } else {
      alert("Please fill out every field");
    }      
  }

  private _fieldsValid(): boolean {
    if(!this.firstName)      
      return false;   
      
    if(!this.lastName)
      return false;

    if(!this.email)
      return false;

    if(!this.password)
      return false;
    
    return true;
  }
}
