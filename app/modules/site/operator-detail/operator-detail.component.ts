import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  OperatorSummary,
  MachineEvent
} from "src/app/core/models/operator-summary.model";
import { KeyValue } from "@angular/common";
import { DateService } from "src/app/core/services/date/date.service";
import { environment } from "src/environments/environment";
import { Alert } from "src/app/core/models/alert.model";

@Component({
  selector: "loxam-operator-detail",
  templateUrl: "./operator-detail.component.html",
  styleUrls: ["./operator-detail.component.scss"]
})
export class OperatorDetailComponent implements OnInit {
  public fromDate: Date;
  public toDate: Date = new Date(Date.now());
  public dateOffset: number;
  public operatorSummary: OperatorSummary;
  public filteredUsage: Array<MachineEvent>;
  public alerts: Array<Alert>;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.operatorSummary = resolved.operatorSummary;
      this.refreshDateDependentData(
        this.dateService.dateFromXDaysAgo(
          environment.config.defaultAmountOfDaysHistoryToShow
        )
      );
    });
  }

  private setAlertSummaryTotals(): void {
    this.alerts = new Array<Alert>();

    let multiLoginCount = 0;
    let skySirenAlertCount = 0;
    let unsecuredMachineCount = 0;

    if (this.operatorSummary) {
      for (var i = 27 - this.dateOffset; i <= 27; i++) {
        multiLoginCount += this.operatorSummary.operatorSiteAlertSummaries[i]
          .multiLoginCount;
        skySirenAlertCount += this.operatorSummary.operatorSiteAlertSummaries[i]
          .skySirenAlertCount;
        unsecuredMachineCount += this.operatorSummary
          .operatorSiteAlertSummaries[i].unsecuredMachineCount;
      }
      this.alerts.push({
        title: "Multi Login",
        value: multiLoginCount,
        link: "../../operational-alerts",
        color: "primary"
      });
      this.alerts.push({
        title: "Unsecured Alerts",
        value: unsecuredMachineCount,
        link: "../../unsecured-mewp-alerts",
        color: "primary"
      });
      this.alerts.push({
        title: "Safety Alerts",
        value: skySirenAlertCount,
        link: "../../safety-alerts",
        color: "accent"
      });
    }
  }

  private filterUsage() {
    if (this.operatorSummary.usages) {
      let arrays = this.operatorSummary.usages
        .filter(item => new Date(item.eventDate) >= this.fromDate)
        .map(day => {
          return day.events;
        });

      this.filteredUsage = [].concat
        .apply([], arrays)
        .sort(function(a: MachineEvent, b: MachineEvent) {
          if (a.startEventDateTime < b.startEventDateTime) {
            return 1;
          }
          if (a.startEventDateTime > b.startEventDateTime) {
            return -1;
          }
          return 0;
        });
    }
  }

  public refreshDateDependentData(fromDate: Date) {
    this.fromDate = fromDate;
    this.dateOffset = this.dateService.dateDiffInDays(
      this.fromDate,
      this.toDate
    );

    this.filterUsage();
    this.setAlertSummaryTotals();
  }
}
