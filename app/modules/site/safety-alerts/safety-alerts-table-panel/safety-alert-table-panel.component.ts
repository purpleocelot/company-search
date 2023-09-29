import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  AfterViewInit
} from "@angular/core";
import {
  PageEvent,
  MatTableDataSource,
  MatPaginator,
  MatTable,
  MatSort
} from "@angular/material";
import { OperationalSafetyAlert } from "src/app/core/models/safety-alert.model";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-safety-alert-table-panel",
  templateUrl: "./safety-alert-table-panel.component.html",
  styleUrls: ["./safety-alert-table-panel.component.scss"]
})
export class SafetyAlertTablePanelComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() safetyAlerts: Array<OperationalSafetyAlert>;
  public dataSource: MatTableDataSource<OperationalSafetyAlert>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = [
    "eventDateTime",
    "eCode",
    "itemDescription",
    "accountName",
    "operatorName"
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
    this.dataSource = new MatTableDataSource<OperationalSafetyAlert>(
      this.safetyAlerts
    );
  }
}
