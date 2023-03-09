import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ITodoList } from "src/app/models/ITodoList";
import { HttpService } from "src/app/services/http.service";
import { MessageService } from "src/app/services/message.service";
import { UserService } from "src/app/services/user.service";
import { DeleteListBase } from "src/app/shared/list-delete-base/list-delete-base.component";

@Component({
    selector: "app-todo-list-card",
    templateUrl: "./todo-list-card.component.html",
    styleUrls: ["./todo-list-card.component.scss"],
})
export class TodoListCardComponent extends DeleteListBase implements OnInit {
    @Input() todoList: ITodoList;

    @Output() refreshLists: EventEmitter<void> = new EventEmitter<void>();

    get hasTasks(): boolean {
        return this.todoList.tasks.length > 0;
    }

    constructor(_userService: UserService, _httpService: HttpService, _router: Router, _messageService: MessageService) {
        super(_userService, _router, _httpService, _messageService);
    }

    ngOnInit(): void {
        this.listId = this.todoList.id;
        this.afterDeleteCallback = this.refresh;
    }

    public openList(listId: number) {
        console.log(listId);
        this._router.navigate(["todolist", listId]);
    }

    public refresh() {
        this.refreshLists.emit();
    }
}
