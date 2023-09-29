import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OperatorSummary } from "src/app/core/models/operator-summary.model";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DateService } from "src/app/core/services/date/date.service";
import { environment } from "src/environments/environment";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-operator-activity",
  templateUrl: "./operator-activity.component.html",
  styleUrls: ["./operator-activity.component.scss"]
})
export class OperatorActivityComponent implements OnInit, AfterViewInit {
  public dataSource;
  public displayedColumns: Array<string> = [
    "operatorName",
    "companyName",
    "mostRecentLogin",
    "lastMewpUsed",
    "usage",
    "skySirenAlertCount",
    "multiLoginCount",
    "unsecuredMachineCount"
  ];
  public paginatorPageSizeOptions: Array<number> = [5, 20, 50];
  private maxDateRange: number = 27;
  public filterText: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource = new MatTableDataSource<OperatorSummary>(
        data.operatorActivity
      );

      // initial calculated totals based on default slider settings
      this.calculateOperatorTotals(
        this.dateService.dateFromXDaysAgo(
          environment.config.defaultAmountOfDaysHistoryToShow
        )
      );
    });
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = sorting;
    this.registerMaterialSortAndPagination();
  }

  public calculateOperatorTotals(fromDate: Date): void {
    let dateOffset: number = this.dateService.dateDiffInDays(
      fromDate,
      new Date(Date.now())
    );

    this.dataSource.data.forEach((operator: OperatorSummary) => {
      // 0 the totals before calculation
      operator["multiLoginCount"] = 0;
      operator["skySirenAlertCount"] = 0;
      operator["unsecuredMachineCount"] = 0;
      operator["usage"] = 0;

      for (
        let i = this.maxDateRange - dateOffset;
        i <= this.maxDateRange;
        i++
      ) {
        // total usage in minutes
        operator.usage += operator.usages[i].usage;

        // total for site alerts as count
        operator.multiLoginCount +=
          operator.operatorSiteAlertSummaries[i].multiLoginCount;

        operator.skySirenAlertCount +=
          operator.operatorSiteAlertSummaries[i].skySirenAlertCount;

        operator.unsecuredMachineCount +=
          operator.operatorSiteAlertSummaries[i].unsecuredMachineCount;
      }

      // reapply existing column sorting
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private registerMaterialSortAndPagination(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
