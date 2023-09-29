import { Component, Input } from "@angular/core";
import { Alert } from "src/app/core/models/alert.model";

@Component({
  selector: "loxam-alert-panel",
  templateUrl: "./alert-panel.component.html",
  styleUrls: ["./alert-panel.component.scss"]
})
export class AlertPanelComponent {
  @Input() alerts: Array<Alert>;

  constructor() {}
}
