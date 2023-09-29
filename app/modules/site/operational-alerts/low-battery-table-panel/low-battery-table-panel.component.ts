import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  PageEvent,
  MatTableDataSource,
  MatPaginator,
  MatTable,
  MatSort
} from "@angular/material";
import { OperationalLowBatteryAlert } from "src/app/core/models/low-battery-alert.model";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-low-battery-table-panel",
  templateUrl: "./low-battery-table-panel.component.html",
  styleUrls: ["./low-battery-table-panel.component.scss"]
})
export class LowBatteryTablePanelComponent implements OnInit {
  @Input() lowBatteries: Array<OperationalLowBatteryAlert>;
  public dataSource: MatTableDataSource<OperationalLowBatteryAlert>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = [
    "eventDate",
    "accountName",
    "eCode",
    "itemDescription"
  ];

  constructor() {}

  ngOnInit() {
    this.instantiateDataTable();
  }

  ngOnChanges() {
    this.instantiateDataTable();
    this.registerMaterialSortAndPagination();
  }

  ngAfterViewInit() {
    this.registerMaterialSortAndPagination();
  }

  private registerMaterialSortAndPagination(): void {
    this.dataSource.sortingDataAccessor = sorting;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private instantiateDataTable() {
    this.dataSource = new MatTableDataSource<OperationalLowBatteryAlert>(
      this.lowBatteries
    );
  }
}
