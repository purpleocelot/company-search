import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "loxam-header-with-filter",
  templateUrl: "./header-with-filter.component.html",
  styleUrls: ["./header-with-filter.component.scss"]
})
export class HeaderWithFilterComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<any>;
  @Input() placeholderText: string = "Filter";
  @Output() filterApplied: EventEmitter<string> = new EventEmitter<string>();

  public filterText: string;

  constructor() {}

  ngOnInit() {}

  public applyFilter() {
    this.filterApplied.emit(this.filterText);
  }

  public clearFilter() {
    this.filterText = "";
    this.applyFilter();
  }
}
