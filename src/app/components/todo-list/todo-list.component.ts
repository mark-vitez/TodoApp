import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HTTP_ACTIONS, HTTP_STATE } from "src/app/constants";
import { ITodoTask } from "src/app/models";
import { ICreateTaskResponse } from "src/app/models/ICreateTaskResponse";
import { INoContentResponse } from "src/app/models/INoContentResponse";
import { ITodoList, ITodoListResponse } from "src/app/models/ITodoList";
import { HttpService } from "src/app/services/http.service";
import { MessageService } from "src/app/services/message.service";
import { UserService } from "src/app/services/user.service";
import { DeleteListBase } from "src/app/shared/list-delete-base/list-delete-base.component";

@Component({
    selector: "app-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent extends DeleteListBase implements OnInit, OnDestroy {
    public listLoading: boolean = false;
    public todoList: ITodoList;
    public showCreateTaskDialog: boolean = false;
    public tasks: ITodoTask[];

    constructor(private _activatedRoute: ActivatedRoute, _router: Router, _userService: UserService, _httpService: HttpService, _messageService: MessageService) {
        super(_userService, _router, _httpService, _messageService);
    }

    get hasTasks(): boolean {
        return this.todoList?.tasks.length > 0;
    }

    ngOnInit(): void {
        var routerSnaphot = this._activatedRoute.snapshot;
        this.listId = Number(routerSnaphot.paramMap.get("id"));
        this._loadList();
    }

    private _loadList() {
        this.listLoading = true;
        this._httpService.getRequest<ITodoListResponse>(HTTP_ACTIONS.GET_LIST, { userId: this._userService.user.userId, listId: this.listId }).subscribe((res) => {
            if (res.state === HTTP_STATE.SUCCESS) {
                this.todoList = res.data;
                this.tasks = [...res.data.tasks];
                this.listLoading = false;
            } else {
                this._messageService.ErrorMessage("There was a problem getting the lists for user.");
            }
        });
    }

    ngOnDestroy(): void {}

    public openTaskCreationDialog(): void {
        this.showCreateTaskDialog = true;
    }

    public closeDialog(data: string | null) {
        if (data) {
            this._httpService.postRequest<ICreateTaskResponse>(HTTP_ACTIONS.CREATE_TASK, { listId: this.listId, description: data }).subscribe((res) => {
                if (res.state == HTTP_STATE.SUCCESS) {
                    this._loadList();
                } else {
                    this._messageService.ErrorMessage("There was a problem adding the new task.");
                }
            });
        }
        this.showCreateTaskDialog = false;
    }

    public goBack() {
        this._router.navigate(["home"]);
    }
}
