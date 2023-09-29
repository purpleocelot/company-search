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
import { OperationalUnsecuredMewpAlert } from "src/app/core/models/unsecured-mewp-alerts.model";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-unsecured-mewp-table-panel",
  templateUrl: "./unsecured-mewp-table-panel.component.html",
  styleUrls: ["./unsecured-mewp-table-panel.component.scss"]
})
export class UnsecuredMewpTablePanelComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() unsecuredMewps: Array<OperationalUnsecuredMewpAlert>;
  public dataSource: MatTableDataSource<OperationalUnsecuredMewpAlert>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = [
    "eventDateTime",
    "ecode",
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
    this.dataSource = new MatTableDataSource<OperationalUnsecuredMewpAlert>(
      this.unsecuredMewps
    );
  }
}
