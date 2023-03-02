import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private _defaultConfig: Partial<IndividualConfig>;

  constructor(private _toasterService: ToastrService) {
    this._defaultConfig = {
      timeOut: 5000,
      newestOnTop: true,
      enableHtml: true,
    };
  }

  public SuccessMessage(
    message: string,
    title?: string,
    options?: Partial<IndividualConfig>
  ) {
    this._toasterService.success(
      message,
      title,
      options ?? this._defaultConfig
    );
  }

  public WarningMessage(
    message: string,
    title?: string,
    options?: Partial<IndividualConfig>
  ) {
    this._toasterService.warning(
      message,
      title,
      options ?? this._defaultConfig
    );
  }

  public ErrorMessage(
    message: string,
    title?: string,
    options?: Partial<IndividualConfig>
  ) {
    this._toasterService.error(message,title,options??this._defaultConfig);
  }
}
