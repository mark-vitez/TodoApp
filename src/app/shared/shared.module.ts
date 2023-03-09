import { NgModule } from "@angular/core";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { InputComponent } from "./input-field/input.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { BlockUiComponent } from "./block-ui/block-ui.component";
import { ButtonComponent } from "./button/button.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { DeleteListBase } from "./list-delete-base/list-delete-base.component";

@NgModule({
    imports: [CommonModule, BrowserModule],
    declarations: [SpinnerComponent, ConfirmationDialogComponent, InputComponent, BlockUiComponent, ButtonComponent, DeleteListBase],
    exports: [SpinnerComponent, ConfirmationDialogComponent, InputComponent, BlockUiComponent, ButtonComponent, DeleteListBase],
})
export class SharedModule {}
