import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { IUsageHistorySummary } from "src/app/core/models/usage-history-summary.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-usage-history-summary-panel",
  templateUrl: "./usage-history-summary-panel.component.html",
  styleUrls: ["./usage-history-summary-panel.component.scss"]
})
export class UsageHistorySummaryPanelComponent implements OnInit {
  @Input() data: Array<IUsageHistorySummary>;
  @Output() selectedSummary: EventEmitter<
    IUsageHistorySummary
  > = new EventEmitter<IUsageHistorySummary>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource: MatTableDataSource<IUsageHistorySummary>;
  public columnsToDisplay = [
    "username",
    "lastAccessedDate",
    "totalPagesAccessed"
  ];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.instantiateDataTable();
    this.registerMaterialSortAndPagination();
  }

  ngAfterViewInit() {
    this.registerMaterialSortAndPagination();
  }

  public selectSummary(usageSummary: IUsageHistorySummary): void {
    if (!usageSummary.username) return;

    this.selectedSummary.emit(usageSummary);
  }

  private registerMaterialSortAndPagination(): void {
    this.dataSource.sortingDataAccessor = sorting;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private instantiateDataTable() {
    this.dataSource = new MatTableDataSource<IUsageHistorySummary>(this.data);
  }
}
