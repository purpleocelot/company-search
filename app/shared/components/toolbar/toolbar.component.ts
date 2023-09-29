import { Component, Input } from "@angular/core";

@Component({
  selector: "loxam-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent {
  @Input() showBackLink: boolean = false;

  constructor() {}

  back() {
    window.history.back();
  }
}
