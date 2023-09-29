import { Component, OnInit, Input } from "@angular/core";
import { MachineSummary } from "src/app/core/models/machine-summary.model";

@Component({
  selector: "loxam-machine-detail-panel",
  templateUrl: "./machine-detail-panel.component.html",
  styleUrls: ["./machine-detail-panel.component.scss"]
})
export class MachineDetailPanelComponent implements OnInit {
  @Input() machineSummary: MachineSummary;

  public tracked: boolean;

  constructor() {}

  ngOnInit() {
    this.tracked = this.machineSummary.blackboxRefNumber != null;
  }
}
