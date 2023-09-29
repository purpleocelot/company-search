import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ChartAggregation,
  DailyEventAggregation
} from "src/app/core/models/chart-aggregation.model";
import { DateService } from "src/app/core/services/date/date.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "loxam-site-utilisation",
  templateUrl: "./site-utilisation.component.html",
  styleUrls: ["./site-utilisation.component.scss"]
})
export class SiteUtilisationComponent implements OnInit {
  public fromDate: Date;
  public toDate: Date = new Date(Date.now());
  public dateOffset: number = 7;
  public filteredAll: Array<DailyEventAggregation>;
  public filteredBoom: Array<DailyEventAggregation>;
  public filteredScissor: Array<DailyEventAggregation>;
  public filteredOther: Array<DailyEventAggregation>;

  private all: ChartAggregation;
  private boom: ChartAggregation;
  private scissor: ChartAggregation;
  private other: ChartAggregation;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.all = resolved.all;
      this.boom = resolved.boom;
      this.scissor = resolved.scissor;
      this.other = resolved.other;

      this.refreshDateDependentData(
        this.dateService.dateFromXDaysAgo(
          environment.config.defaultAmountOfDaysHistoryToShow
        )
      );
    });
  }
  filterEvents(): void {
    this.filteredAll = this.filterUtilisation(this.all);
    this.filteredBoom = this.filterUtilisation(this.boom);
    this.filteredScissor = this.filterUtilisation(this.scissor);
    this.filteredOther = this.filterUtilisation(this.other);
  }

  private filterUtilisation(
    collection: ChartAggregation
  ): Array<DailyEventAggregation> {
    if (collection) {
      let arrays = collection.dateMeasures.filter(
        item => new Date(item.eventDate) >= this.fromDate
      );

      return arrays.sort(function(
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

  public refreshDateDependentData(fromDate: Date) {
    this.fromDate = fromDate;
    this.dateOffset = this.dateService.dateDiffInDays(
      this.fromDate,
      this.toDate
    );

    this.filterEvents();
  }
}
