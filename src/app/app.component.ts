import { Component } from "@angular/core";
import { LoadingService } from "./services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "TodoApp";

  public blockUi = false;

  constructor(private loadingService: LoadingService) {
    loadingService.isLoadingEmitter.subscribe((isLoading) => {
      this.blockUi = isLoading;
    });
  }
}
