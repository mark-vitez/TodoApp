import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { MessageService } from "./message.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}
    handleError(error) {
        console.log("error found");
        console.error(error);

        var _messageService = this.injector.get(MessageService);
        _messageService.ErrorMessage(error);
    }
}
