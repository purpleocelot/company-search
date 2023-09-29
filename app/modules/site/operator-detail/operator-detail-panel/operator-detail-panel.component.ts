import { Component, OnInit, Input } from "@angular/core";
import { OperatorSummary } from "src/app/core/models/operator-summary.model";

@Component({
  selector: "loxam-operator-detail-panel",
  templateUrl: "./operator-detail-panel.component.html",
  styleUrls: ["./operator-detail-panel.component.scss"]
})
export class OperatorDetailPanelComponent implements OnInit {
  @Input() operatorSummary: OperatorSummary;

  constructor() {}

  ngOnInit() {}
}
