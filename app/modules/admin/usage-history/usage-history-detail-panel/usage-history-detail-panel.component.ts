import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { IUsageHistorySummary } from "src/app/core/models/usage-history-summary.model";
import { UsageHistoryService } from "src/app/core/services/usage-history/usage-history.service";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { UsageHistory } from "src/app/core/models/usage-history.model";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-usage-history-detail-panel",
  templateUrl: "./usage-history-detail-panel.component.html",
  styleUrls: ["./usage-history-detail-panel.component.scss"]
})
export class UsageHistoryDetailPanelComponent implements OnInit {
  @Input() data: IUsageHistorySummary;

  @ViewChild("detailsSort") detailsSort: MatSort;
  @ViewChild("paginator") paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.detailsSort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  public usageHistoryDetails: Array<UsageHistory>;
  public dataSource: MatTableDataSource<UsageHistory>;
  public columnsToDisplay = ["eventDateTime", "pageName", "siteId"];

  constructor(private usageHistoryService: UsageHistoryService) {}

  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {
    this.instantiateDataTable();
    this.registerMaterialSortAndPagination();
  }

  ngAfterViewInit() {
    this.registerMaterialSortAndPagination();
  }

  getData(): void {
    this.usageHistoryService
      .getHistoryDetail(this.data.username)
      .subscribe(response => {
        this.usageHistoryDetails = response;

        this.instantiateDataTable();
        this.registerMaterialSortAndPagination();
      });
  }

  private registerMaterialSortAndPagination(): void {
    this.dataSource.sortingDataAccessor = sorting;
    this.dataSource.sort = this.detailsSort;
    this.dataSource.paginator = this.paginator;
  }

  private instantiateDataTable() {
    this.dataSource = new MatTableDataSource<UsageHistory>(
      this.usageHistoryDetails
    );
  }

  private setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.detailsSort;
  }
}
