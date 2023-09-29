import { Component, OnInit, Input } from "@angular/core";
import { DailyEventAggregation } from "src/app/core/models/chart-aggregation.model";
import * as moment from "moment";
import { UserService } from "src/app/core/services/user/user.service";
import { LocalisationService } from "src/app/core/services/localisation/localisation.service";

@Component({
  selector: "loxam-utilisation-chart",
  templateUrl: "./utilisation-chart.component.html",
  styleUrls: ["./utilisation-chart.component.scss"]
})
export class UtilisationChartComponent implements OnInit {
  @Input() utilisationEvents: Array<DailyEventAggregation>;
  @Input() chartTitle: string;
  public categories: Array<string>;
  public aggregatedPercentage: number;
  public aggregatedHours: number;
  public barColour: string;
  public overBarColour: string;

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
    let x = this.utilisationEvents.map(event =>
      moment(event.eventDate).format("YYYY/MM/DD")
    );
    return x;
  }

  private chartCalculations() {
    this.categories = this.getCategories();
    this.process100PercentPlusEvents();
    this.calculatePercentageAndHoursForPeriod();
  }

  private setTheme() {
    this.barColour = this.userService.userSettings.selectedUICompany.chartSettings.barColour;
    this.overBarColour = this.userService.userSettings.selectedUICompany.chartSettings.overBarColour;
    this.chartCalculations();
  }

  private calculatePercentageAndHoursForPeriod() {
    let percentageTotal: number = 0;
    let decimalTotal: number = 0;

    this.utilisationEvents.forEach(day => {
      percentageTotal += day.aggregatedValue;
      decimalTotal += day.aggregatedDecimalValue;
    });

    const calculatedPercentage = (
      percentageTotal / this.utilisationEvents.length
    ).toFixed(2);

    this.aggregatedPercentage = Number(calculatedPercentage);
    this.aggregatedHours = decimalTotal;
  }

  private process100PercentPlusEvents(): any {
    this.utilisationEvents.forEach(event => {
      if (event.aggregatedValue > 100) {
        event.preFullValue = 100;
        event.postFullValue = event.aggregatedValue - 100;
      } else {
        event.preFullValue = event.aggregatedValue;
        event.postFullValue = 0;
      }
    });
  }
}
