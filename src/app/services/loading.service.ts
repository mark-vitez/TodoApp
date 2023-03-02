import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private isLoadingSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoadingEmitter = this.isLoadingSub.asObservable();

  constructor() {}

  public show() {
    this.isLoadingSub.next(true);
  }

  public hide() {
    this.isLoadingSub.next(false);
  }
}
