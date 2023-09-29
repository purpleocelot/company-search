import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MachineOperation } from "src/app/core/models/machine-operations.model";
import {
  MatTableDataSource,
  MatPaginator,
  MatTable,
  MatSort
} from "@angular/material";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-machine-operations-details-panel",
  templateUrl: "./machine-operations-details-panel.component.html",
  styleUrls: ["./machine-operations-details-panel.component.scss"]
})
export class MachineOperationsDetailsPanelComponent implements OnInit {
  @Input() operations: Array<MachineOperation>;
  public dataSource: MatTableDataSource<MachineOperation>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = [
    "eCode",
    "itemDescription",
    "contractor",
    "lastOperator",
    "usage",
    "lastRecordedUse",
    "days",
    "nextService",
    "onHireUntil"
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
    this.dataSource = new MatTableDataSource<MachineOperation>(this.operations);
  }
}
