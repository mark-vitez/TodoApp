import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    styleUrls: ["./button.component.scss"],
    templateUrl: "./button.component.html",
    selector: "app-button",
})
export class ButtonComponent {
    @Input() icon: string = "";
    @Input() label: string = "";
    @Input() type: "primary" | "secondary" | "light" | "icon" = "primary";
    @Input() disabled: boolean = false;

    @Output() clickEvt: EventEmitter<void> = new EventEmitter<void>();

    public handleClick(event: Event) {
        console.log(event);
        
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled) return;
        this.clickEvt.emit();
    }

    constructor() {}
}
