import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HTTP_ACTIONS, HTTP_STATE } from "src/app/constants";
import { INoContentResponse } from "src/app/models/INoContentResponse";
import { HttpService } from "src/app/services/http.service";
import { MessageService } from "src/app/services/message.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-delete",
    template: "",
})
export class DeleteListBase {
    public listId: number;
    public showListConfirmation: boolean = false;
    public dialogQuestion = "Are you sure you want to delete this list?";
    public afterDeleteCallback: any;

    constructor(protected _userService: UserService, protected _router: Router, protected _httpService: HttpService, protected _messageService: MessageService) {}

    public openConfirmationDialog() {
        this.showListConfirmation = true;
    }

    public handleChoice(choice: boolean) {
        this.showListConfirmation = false;
        if (choice) this.deleteList();
    }

    private deleteList() {
        this._httpService.deleteRequest<INoContentResponse>(HTTP_ACTIONS.DELETE_LIST, { userId: this._userService.user.userId, listId: this.listId }).subscribe((res) => {
            if (res.state == HTTP_STATE.SUCCESS) {
                this._router.navigate(["home"]);
                if (this.afterDeleteCallback) this.afterDeleteCallback();
            } else {
                this._messageService.ErrorMessage("There was a problem deleting the lists.");
            }
        });
    }
}
