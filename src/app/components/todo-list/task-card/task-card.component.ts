import { Component, Input, OnInit } from "@angular/core";
import { HTTP_ACTIONS, HTTP_STATE } from "src/app/constants";
import { INoContentResponse } from "src/app/models/INoContentResponse";
import { ITodoTask } from "src/app/models/ITodoTask";
import { HttpService } from "src/app/services/http.service";
import { LoadingService } from "src/app/services/loading.service";

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input() task: ITodoTask;

  public showDeleteDialog = false;

  public showUpdateTaskDialog: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  updateTaskState() {
    let data = {
      taskId: this.task.id,
      state: !this.task.done,
    };
    this._loadingService.show();
    this._httpService
      .patchRequest<INoContentResponse>(HTTP_ACTIONS.SET_TASK_STATE, data)
      .subscribe((res) => {
        if (res.state === HTTP_STATE.SUCCESS) {
          this.task.done = !this.task.done;
        } else {
        }

        this._loadingService.hide();
      });
  }

  cardTapped() {
    console.log(this.task.id);
  }

  public toggleCardState() {}

  public deleteTapped() {
    this.showDeleteDialog = true;
  }

  public deleteDialogClosed(choice: boolean) {
    this.showDeleteDialog = false;

    if (choice) {
      this._deleteTask();
    }
  }

  private _deleteTask() {
    console.log(`Deleting task ${this.task.id}`);
    this._httpService
      .deleteRequest(HTTP_ACTIONS.DELETE_TASK, { taskId: this.task.id })
      .subscribe((res: any) => {
        if (res.state === HTTP_STATE.SUCCESS) {
          window.location.reload();
        }
      });
  }
}
