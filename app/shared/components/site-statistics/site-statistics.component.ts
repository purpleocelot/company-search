import { Component, OnInit, Input } from "@angular/core";
import { SiteSummary } from "src/app/core/models/site-summary.model";

@Component({
  selector: "loxam-site-statistics",
  templateUrl: "./site-statistics.component.html",
  styleUrls: ["./site-statistics.component.scss"]
})
export class SiteStatisticsComponent implements OnInit {
  @Input() data: SiteSummary;

  constructor() {}

  ngOnInit() {}
}
