import { NgModule } from "@angular/core";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { InputComponent } from "./input-field/input.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { BlockUiComponent } from "./block-ui/block-ui.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    ConfirmationDialogComponent,
    InputComponent,
    BlockUiComponent,
  ],
  exports: [
    SpinnerComponent,
    ConfirmationDialogComponent,
    InputComponent,
    BlockUiComponent,
  ],
})
export class SharedModule {}
