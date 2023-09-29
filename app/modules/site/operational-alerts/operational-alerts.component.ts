import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import {
  OperationalLowBatteryAlert,
  LowBatteryAlerts
} from "src/app/core/models/low-battery-alert.model";
import { DateService } from "src/app/core/services/date/date.service";
import {
  ChartAggregation,
  DailyEventAggregation
} from "src/app/core/models/chart-aggregation.model";
import {
  MultiLoginAlerts,
  OperationalMultiLoginAlert
} from "src/app/core/models/multi-login-alert.model";

@Component({
  selector: "loxam-operational-alerts",
  templateUrl: "./operational-alerts.component.html",
  styleUrls: ["./operational-alerts.component.scss"]
})
export class OperationalAlertsComponent implements OnInit {
  private fromDate: Date;
  public filteredLowBatteryAlerts: Array<OperationalLowBatteryAlert>;
  private lowBatteryAlerts: Array<LowBatteryAlerts>;
  public filteredLowBatteryChart: Array<DailyEventAggregation>;
  private lowBatteryChart: ChartAggregation;
  public filteredMultiLoginAlerts: Array<OperationalMultiLoginAlert>;
  private multiLoginAlerts: Array<MultiLoginAlerts>;
  public filteredMultiLoginChart: Array<DailyEventAggregation>;
  private multiLoginChart: ChartAggregation;
  public anyLowBatteryData: boolean;
  public anyMultiLoginData: boolean;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.lowBatteryAlerts = resolved.lowBatteryAlerts;
      this.lowBatteryChart = resolved.lowBatteryChart;
      this.multiLoginAlerts = resolved.multiLoginAlerts;
      this.multiLoginChart = resolved.multiLoginChart;

      this.anyLowBatteryData =
        this.lowBatteryAlerts.find(day => {
          return day.operationalLowBatteries.length > 0;
        }) != null;
      this.anyMultiLoginData =
        this.multiLoginAlerts.find(day => {
          return day.operationalMultiLogins.length > 0;
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
    this.filterLowBatteryAlerts();
    this.filterLowBatteryChartRecords();
    this.filterMultiLoginAlerts();
    this.filterMultiLoginChartRecords();
  }

  private filterMultiLoginChartRecords(): void {
    if (this.multiLoginChart) {
      let arrays = this.multiLoginChart.dateMeasures.filter(
        item => new Date(item.eventDate) >= this.fromDate
      );

      this.filteredMultiLoginChart = arrays.sort(function(
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

  private filterMultiLoginAlerts(): void {
    if (this.multiLoginAlerts) {
      let arrays = this.multiLoginAlerts
        .filter(item => new Date(item.eventDate) >= this.fromDate)
        .map(day => {
          return day.operationalMultiLogins;
        });

      this.filteredMultiLoginAlerts = [].concat
        .apply([], arrays)
        .sort(function(
          a: OperationalMultiLoginAlert,
          b: OperationalMultiLoginAlert
        ) {
          if (a.eventDate < b.eventDate) {
            return 1;
          }
          if (a.eventDate > b.eventDate) {
            return -1;
          }
          return 0;
        });
    }
  }

  private filterLowBatteryChartRecords(): void {
    if (this.lowBatteryChart) {
      let arrays = this.lowBatteryChart.dateMeasures.filter(
        item => new Date(item.eventDate) >= this.fromDate
      );

      this.filteredLowBatteryChart = arrays.sort(function(
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

  private filterLowBatteryAlerts(): void {
    if (this.lowBatteryAlerts) {
      let arrays = this.lowBatteryAlerts
        .filter(item => new Date(item.eventDate) >= this.fromDate)
        .map(day => {
          return day.operationalLowBatteries;
        });

      this.filteredLowBatteryAlerts = [].concat
        .apply([], arrays)
        .sort(function(
          a: OperationalLowBatteryAlert,
          b: OperationalLowBatteryAlert
        ) {
          if (a.eventDate < b.eventDate) {
            return 1;
          }
          if (a.eventDate > b.eventDate) {
            return -1;
          }
          return 0;
        });
    }
  }
}
