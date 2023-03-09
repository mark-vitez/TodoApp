import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HTTP_ACTIONS, HTTP_STATE } from "src/app/constants";
import { INoContentResponse } from "src/app/models/INoContentResponse";
import { ITodoList, ITodoListsResponse } from "src/app/models/ITodoList";
import { HttpService } from "src/app/services/http.service";
import { MessageService } from "src/app/services/message.service";
import { UserService } from "src/app/services/user.service";
import { CreateListComponent } from "./create-list/create-list.component";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
    public numbers = [0, 0, 0, 0, 0, 0, 0, 0];
    public showListCreation = false;

    public todoLists: ITodoList[];

    constructor(private _httpService: HttpService, private _userService: UserService, private _messageService: MessageService) {}

    ngOnInit(): void {
        this.getTodoListsForUser();
    }

    public openTodolistCreationDialog() {
        this.showListCreation = true;
    }

    public closeDialog(listTitle: string) {
        if (listTitle) {
            console.log(listTitle);
            this._httpService
                .postRequest<INoContentResponse>(HTTP_ACTIONS.CREATE_LIST, {
                    userId: this._userService?.user.userId,
                    name: listTitle,
                })
                .subscribe((res) => {
                    if (res.state === HTTP_STATE.SUCCESS) {
                        this.getTodoListsForUser();
                    } else {
                        this._messageService.ErrorMessage("There was a problem creating the new list.");
                    }
                });
        }

        this.showListCreation = false;
    }

    public getTodoListsForUser() {
        this._httpService
            .getRequest<ITodoListsResponse>(HTTP_ACTIONS.GET_USER_LISTS, {
                userId: this._userService.user.userId,
            })
            .subscribe((res) => {
                if (res.state === HTTP_STATE.SUCCESS) {
                    this.todoLists = res.data;
                    console.log(this.todoLists);
                } else {
                    this._messageService.ErrorMessage("There was a problem getting the lists for user.");
                }
            });
    }
}
