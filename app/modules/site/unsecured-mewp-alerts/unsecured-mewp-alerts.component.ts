import { Component, OnInit } from "@angular/core";
import {
  ChartAggregation,
  DailyEventAggregation
} from "src/app/core/models/chart-aggregation.model";
import { ActivatedRoute } from "@angular/router";
import { DateService } from "src/app/core/services/date/date.service";
import { environment } from "src/environments/environment";
import {
  UnsecuredMewpAlerts,
  OperationalUnsecuredMewpAlert
} from "src/app/core/models/unsecured-mewp-alerts.model";
import { LocationItem } from "src/app/core/models/locations.model";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "loxam-unsecured-mewp-alerts",
  templateUrl: "./unsecured-mewp-alerts.component.html",
  styleUrls: ["./unsecured-mewp-alerts.component.scss"]
})
export class UnsecuredMewpAlertsComponent implements OnInit {
  private fromDate: Date;
  private unsecuredMewpChart: ChartAggregation;
  private unsecuredMewpAlerts: Array<UnsecuredMewpAlerts>;
  public filteredUnsecuredMewpChart: Array<DailyEventAggregation>;
  public filteredUnsecuredMewpAlerts: Array<OperationalUnsecuredMewpAlert>;
  public unsecuredMachineLocations: Array<LocationItem>;
  public anyUnsecuredMewpData: boolean;
  public defaultMapCenterLat: number = undefined;
  public defaultMapCenterLong: number = undefined;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.unsecuredMewpAlerts = resolved.unsecuredMewpAlerts;
      this.unsecuredMewpChart = resolved.unsecuredMewpChart;

      this.anyUnsecuredMewpData =
        this.unsecuredMewpAlerts.find(day => {
          return day.unsecuredDetails.length > 0;
        }) != null;

      this.refreshDateDependentData(
        this.dateService.dateFromXDaysAgo(
          environment.config.defaultAmountOfDaysHistoryToShow
        )
      );
    });
  }

  public refreshDateDependentData(fromDate: Date) {
    this.fromDate = fromDate;
    this.filterUnsecuredMewpAlerts();
    this.filterUnsecuredMewpChart();
    this.filterUnsecuredMewpLocations();
  }

  private filterUnsecuredMewpChart(): void {
    if (this.unsecuredMewpChart) {
      let arrays = this.unsecuredMewpChart.dateMeasures.filter(
        item => new Date(item.eventDate) >= this.fromDate
      );

      this.filteredUnsecuredMewpChart = arrays.sort(function(
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

  private filterUnsecuredMewpAlerts(): void {
    if (this.unsecuredMewpAlerts) {
      let arrays = this.unsecuredMewpAlerts
        .filter(item => new Date(item.eventDate) >= this.fromDate)
        .map(day => {
          return day.unsecuredDetails;
        });

      this.filteredUnsecuredMewpAlerts = [].concat
        .apply([], arrays)
        .sort(function(
          a: OperationalUnsecuredMewpAlert,
          b: OperationalUnsecuredMewpAlert
        ) {
          if (a.eventDateTime < b.eventDateTime) {
            return 1;
          }
          if (a.eventDateTime > b.eventDateTime) {
            return -1;
          }
          return 0;
        });
    }
  }

  private filterUnsecuredMewpLocations(): void {
    if (this.unsecuredMewpAlerts) {
      let arrays = this.unsecuredMewpAlerts
        .filter(item => new Date(item.eventDate) >= this.fromDate)
        .map(day => {
          return day.unsecuredDetails;
        });

      let filteredLocations: Array<
        OperationalUnsecuredMewpAlert
      > = [].concat.apply([], arrays);
      this.unsecuredMachineLocations = filteredLocations.map(
        unsecured =>
          new LocationItem(
            unsecured.ecode,
            unsecured.itemDescription,
            unsecured.machineKey,
            Number(unsecured.latitude),
            Number(unsecured.longitude),
            null
          )
      );

      this.defaultMapCenterLat = this.userService.userSettings.selectedSite.siteDefaultLatitude;
      this.defaultMapCenterLong = this.userService.userSettings.selectedSite.siteDefaultLongitude;
    }
  }
}
