import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges
} from "@angular/core";
import { MachineUsageEvent } from "src/app/core/models/machine-usage.model";
import {
  PageEvent,
  MatTableDataSource,
  MatPaginator,
  MatTable,
  MatSort
} from "@angular/material";
import { sorting } from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-machine-usage-panel",
  templateUrl: "./machine-usage-panel.component.html",
  styleUrls: ["./machine-usage-panel.component.scss"]
})
export class MachineUsagePanelComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() usage: Array<MachineUsageEvent>;
  public dataSource: MatTableDataSource<MachineUsageEvent>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = [
    "startEventDateTime",
    "accountName",
    "operatorName",
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
    this.dataSource = new MatTableDataSource<MachineUsageEvent>(this.usage);
  }
}
