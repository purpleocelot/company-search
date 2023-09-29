import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MachineSummary } from "src/app/core/models/machine-summary.model";
import {
  ChartAggregation,
  DailyEventAggregation
} from "src/app/core/models/chart-aggregation.model";
import {
  DailyUsageRecord,
  MachineUsageEvent
} from "src/app/core/models/machine-usage.model";
import { MachineSiteAlertSummary } from "src/app/core/models/site-summary.model";
import { Location } from "src/app/core/models/locations.model";
import { KeyValue } from "@angular/common";
import { DateService } from "src/app/core/services/date/date.service";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/core/services/user/user.service";
import { Alert } from "src/app/core/models/alert.model";

@Component({
  selector: "loxam-machine-detail",
  templateUrl: "./machine-detail.component.html",
  styleUrls: ["./machine-detail.component.scss"]
})
export class MachineDetailComponent implements OnInit {
  public machineSummary: MachineSummary;
  public machineLocation: Array<Location>;
  public utilisation: ChartAggregation;
  public usage: Array<DailyUsageRecord>;
  public filteredUsage: Array<MachineUsageEvent>;
  public alertSummary: Array<MachineSiteAlertSummary>;
  public dateOffset: number;
  public toDate: Date = new Date(Date.now());
  public fromDate: Date;
  public filteredUtilisationEvents: Array<DailyEventAggregation>;
  public alerts: Array<Alert>;
  public pageTitle: string;
  public defaultMapCenterLat: number;
  public defaultMapCenterLong: number;
  public tracked: boolean;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.alertSummary = resolved.alertSummary;
      this.machineSummary = resolved.machineSummary;
      this.tracked = this.machineSummary.blackboxRefNumber != null;
      this.pageTitle = `${this.machineSummary.eCode} - 
                        ${this.machineSummary.itemDescription}`;
      this.setLocationDetails();
      this.usage = resolved.usage;
      this.utilisation = resolved.utilisation;
      this.refreshDateDependentData(
        this.dateService.dateFromXDaysAgo(
          environment.config.defaultAmountOfDaysHistoryToShow
        )
      );
    });
  }

  public refreshDateDependentData(fromDate: Date) {
    this.fromDate = fromDate;
    this.dateOffset = this.dateService.dateDiffInDays(
      this.fromDate,
      this.toDate
    );
    if (this.tracked) this.setAlertSummaryTotals();
    this.filterUsage();
    this.filterUtilisation();
  }

  private filterUsage() {
    if (this.usage) {
      let arrays = this.usage
        .filter(item => new Date(item.date) >= this.fromDate)
        .map(day => {
          return day.events;
        });

      this.filteredUsage = [].concat
        .apply([], arrays)
        .sort(function(a: MachineUsageEvent, b: MachineUsageEvent) {
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

  private filterUtilisation() {
    if (this.utilisation) {
      let arrays = this.utilisation.dateMeasures.filter(
        item => new Date(item.eventDate) >= this.fromDate
      );

      this.filteredUtilisationEvents = arrays.sort(function(
        a: DailyEventAggregation,
        b: DailyEventAggregation
      ) {
        if (a.eventDate < b.eventDate) {
          return -1;
        }
        if (a.eventDate > b.eventDate) {
          return 1;
        }
        return 0;
      });
    }
  }

  private setAlertSummaryTotals(): void {
    this.alerts = new Array<Alert>();

    let lowBatteryMachineCount = 0;
    let skySirenAlertCount = 0;
    let unsecuredMachineCount = 0;

    if (this.alertSummary) {
      for (var i = 27 - this.dateOffset; i <= 27; i++) {
        lowBatteryMachineCount += this.alertSummary[i].lowBatteryMachineCount;
        skySirenAlertCount += this.alertSummary[i].skySirenAlertCount;
        unsecuredMachineCount += this.alertSummary[i].unsecuredMachineCount;
      }
      this.alerts.push({
        title: "Low Battery",
        value: lowBatteryMachineCount,
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

  private setLocationDetails(): void {
    let location = {
      eCode: this.machineSummary.eCode,
      itemDescription: this.machineSummary.itemDescription,
      machineKey: this.machineSummary.machineKey,
      latitude: this.machineSummary.latitude,
      longitude: this.machineSummary.longitude
    };
    this.machineLocation = [location] as Array<Location>;
    this.defaultMapCenterLat = this.userService.userSettings.selectedSite.siteDefaultLatitude;
    this.defaultMapCenterLong = this.userService.userSettings.selectedSite.siteDefaultLongitude;
  }
}
