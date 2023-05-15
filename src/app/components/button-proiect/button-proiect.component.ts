import { Component, Input } from "@angular/core";

@Component({
    selector: "button-proiect",
    templateUrl: "./button-proiect.component.html",
    styleUrls: ["./button-proiect.component.scss"]
})
export class ButtonProiectComponent{
    @Input() buttonType: String = "primary"
    @Input() buttonText: String = "button project"
}