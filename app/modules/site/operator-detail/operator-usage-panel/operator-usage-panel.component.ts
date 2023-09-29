import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  AfterViewInit
} from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatTable,
  MatSort
} from "@angular/material";
import { MachineEvent } from "src/app/core/models/operator-summary.model";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-operator-usage-panel",
  templateUrl: "./operator-usage-panel.component.html",
  styleUrls: ["./operator-usage-panel.component.scss"]
})
export class OperatorUsagePanelComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() usage: Array<MachineEvent>;
  public dataSource: MatTableDataSource<MachineEvent>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = [
    "startEventDateTime",
    "accountName",
    "eCode",
    "minutesDiff"
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
    this.dataSource = new MatTableDataSource<MachineEvent>(this.usage);
  }
}
