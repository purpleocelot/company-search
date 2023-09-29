import { Component, OnInit, Input } from "@angular/core";
import { DailyEventAggregation } from "src/app/core/models/chart-aggregation.model";
import * as moment from "moment";
import { UserService } from "src/app/core/services/user/user.service";
import { LocalisationService } from "src/app/core/services/localisation/localisation.service";

@Component({
  selector: "loxam-static-chart",
  templateUrl: "./static-chart.component.html",
  styleUrls: ["./static-chart.component.scss"]
})
export class StaticChartComponent implements OnInit {
  @Input() events: Array<DailyEventAggregation>;
  @Input() chartTitle: string;
  public categories: Array<string>;
  public aggregatedValue: number;
  public barColour: string;
  public overBarColour: string;
  public decimalTotal: number;

  constructor(
    private userService: UserService,
    private localisationService: LocalisationService
  ) {}

  ngOnInit() {
    this.userService.userSettingsChanged.subscribe(event => {
      this.setTheme();
    });
    this.setTheme();
  }

  ngOnChanges() {
    this.chartCalculations();
  }

  public getDateFormat(): string {
    const locale: string = this.userService.userSettings.selectedLanguage.code;
    return this.localisationService.getFormat(locale, "shortDate");
  }

  public getCategories(): Array<string> {
    let x = this.events.map(event =>
      moment(event.eventDate).format("YYYY/MM/DD")
    );
    return x;
  }

  private chartCalculations() {
    this.categories = this.getCategories();
    this.calculatePercentageAndHoursForPeriod();
  }

  private setTheme() {
    this.barColour = this.userService.userSettings.selectedUICompany.chartSettings.barColour;
    this.overBarColour = this.userService.userSettings.selectedUICompany.chartSettings.overBarColour;
    this.chartCalculations();
  }

  private calculatePercentageAndHoursForPeriod() {
    this.aggregatedValue = 0;
    this.decimalTotal = 0;

    this.events.forEach(day => {
      this.aggregatedValue += day.aggregatedValue;
      this.decimalTotal += day.aggregatedDecimalValue;
      day.preFullValue = day.aggregatedValue;
    });
  }
}
