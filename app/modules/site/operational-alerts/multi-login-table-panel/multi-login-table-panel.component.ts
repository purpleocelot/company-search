import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges
} from "@angular/core";
import {
  PageEvent,
  MatTableDataSource,
  MatPaginator,
  MatTable,
  MatSort
} from "@angular/material";
import { OperationalMultiLoginAlert } from "src/app/core/models/multi-login-alert.model";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-multi-login-table-panel",
  templateUrl: "./multi-login-table-panel.component.html",
  styleUrls: ["./multi-login-table-panel.component.scss"]
})
export class MultiLoginTablePanelComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() multiLogins: Array<OperationalMultiLoginAlert>;
  public dataSource: MatTableDataSource<OperationalMultiLoginAlert>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = [
    "eventDate",
    "operatorName",
    "countOfMachineMultipleLogins"
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
    this.dataSource = new MatTableDataSource<OperationalMultiLoginAlert>(
      this.multiLogins
    );
  }
}
