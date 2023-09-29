import { Component, OnInit } from "@angular/core";
import {
  ChartAggregation,
  DailyEventAggregation
} from "src/app/core/models/chart-aggregation.model";
import { ActivatedRoute } from "@angular/router";
import { DateService } from "src/app/core/services/date/date.service";
import { environment } from "src/environments/environment";
import { LocationItem } from "src/app/core/models/locations.model";
import {
  SafetyAlerts,
  OperationalSafetyAlert
} from "src/app/core/models/safety-alert.model";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "loxam-safety-alerts",
  templateUrl: "./safety-alerts.component.html",
  styleUrls: ["./safety-alerts.component.scss"]
})
export class SafetyAlertsComponent implements OnInit {
  private fromDate: Date;
  private safetyChart: ChartAggregation;
  public safetyAlerts: Array<SafetyAlerts>;
  public filteredSafetyChart: Array<DailyEventAggregation>;
  public filteredSafetyAlerts: Array<OperationalSafetyAlert>;
  public safetyAlertMachineLocations: Array<LocationItem>;
  public anySafetyData: boolean;
  public defaultMapCenterLat: number = undefined;
  public defaultMapCenterLong: number = undefined;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.safetyAlerts = resolved.safetyAlerts;
      this.safetyChart = resolved.safetyChart;

      this.anySafetyData =
        this.safetyAlerts.find(alert => {
          return alert.safetyDetails.length > 0;
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
    this.filterSafetyAlerts();
    this.filterSafetyChart();
    this.filterSafetyLocations();
  }

  private filterSafetyChart(): void {
    if (this.safetyChart) {
      let arrays = this.safetyChart.dateMeasures.filter(
        item => new Date(item.eventDate) >= this.fromDate
      );

      this.filteredSafetyChart = arrays.sort(function(
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

  private filterSafetyAlerts(): void {
    if (this.safetyAlerts) {
      let arrays = this.safetyAlerts
        .filter(item => new Date(item.eventDate) >= this.fromDate)
        .map(day => {
          return day.safetyDetails;
        });

      this.filteredSafetyAlerts = [].concat
        .apply([], arrays)
        .sort(function(a: OperationalSafetyAlert, b: OperationalSafetyAlert) {
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

  private filterSafetyLocations(): void {
    this.defaultMapCenterLat = undefined;
    this.defaultMapCenterLong = undefined;

    if (this.safetyAlerts) {
      let arrays = this.safetyAlerts
        .filter(item => new Date(item.eventDate) >= this.fromDate)
        .map(day => {
          return day.safetyDetails;
        });

      let filteredLocations: Array<OperationalSafetyAlert> = [].concat.apply(
        [],
        arrays
      );
      this.safetyAlertMachineLocations = filteredLocations.map(
        unsecured =>
          new LocationItem(
            unsecured.eCode,
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
