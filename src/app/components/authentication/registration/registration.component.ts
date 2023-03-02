import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { IRegistrationModel } from "src/app/models/registration-model";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  public email: string;
  public password: string;

  @Output() registrationForm = new EventEmitter<IRegistrationModel>();

  constructor() {}

  ngOnInit(): void {}

  public register() {
    this.registrationForm.emit({
      email: this.email,
      password: this.password,
    });
  }
}
