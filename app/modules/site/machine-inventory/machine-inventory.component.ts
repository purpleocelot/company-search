import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MachineSummary } from "src/app/core/models/machine-summary.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "loxam-machine-inventory",
  templateUrl: "./machine-inventory.component.html",
  styleUrls: ["./machine-inventory.component.scss"]
})
export class MachineInventoryComponent implements OnInit, AfterViewInit {
  public displayedColumns: Array<string> = [
    "eCode",
    "machine",
    "power",
    "deviceId",
    "contractor"
  ];

  public machines: Array<Machines> = [
    {
      type: "boom",
      title: "Booms",
      list: undefined
    },
    {
      type: "scissor",
      title: "Scissors",
      list: undefined
    },
    {
      type: "other",
      title: "Others",
      list: undefined
    },
    {
      type: "untracked",
      title: "Untracked",
      list: undefined
    }
  ];
  public paginatorPageSizeOptions: Array<number> = [5, 20, 50];

  // reference array positon for each machine type so we can insert resolved data correctly
  public readonly boomsArrayPosition = 0;
  public readonly scissorsArrayPosition = 1;
  public readonly othersArrayPosition = 2;
  public readonly untrackedArrayPosition = 3;

  @ViewChild("sortForBooms") sortForBooms: MatSort;
  @ViewChild("sortForScissors") sortForScissors: MatSort;
  @ViewChild("sortForOthers") sortForOthers: MatSort;
  @ViewChild("sortForUntracked") sortForUntracked: MatSort;
  @ViewChild("paginatorBooms") paginatorBooms: MatPaginator;
  @ViewChild("paginatorScissors") paginatorScissors: MatPaginator;
  @ViewChild("paginatorOthers") paginatorOthers: MatPaginator;
  @ViewChild("paginatorUntracked") paginatorUntracked: MatPaginator;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.machines[this.boomsArrayPosition].list = new MatTableDataSource(
        resolved.booms
      );
      this.machines[this.scissorsArrayPosition].list = new MatTableDataSource(
        resolved.scissors
      );
      this.machines[this.othersArrayPosition].list = new MatTableDataSource(
        resolved.others
      );
      this.machines[this.untrackedArrayPosition].list = new MatTableDataSource(
        resolved.untracked
      );
    });
  }

  ngAfterViewInit() {
    this.machines.forEach(machine => {
      machine.list.sortingDataAccessor = this.machineSorting;
    });

    this.registerMaterialSortAndPagination();
  }

  private machineSorting(item, property): string | number {
    switch (property) {
      case "eCode":
        return item.eCode;
      case "machine":
        return item.itemDescription;
      case "deviceId":
        return item.blackBoxRefNumber;
      case "contractor":
        return item.accountName;
      default:
        break;
    }
  }

  private registerMaterialSortAndPagination(): void {
    this.machines[this.boomsArrayPosition].list.sort = this.sortForBooms;
    this.machines[this.scissorsArrayPosition].list.sort = this.sortForScissors;
    this.machines[this.othersArrayPosition].list.sort = this.sortForOthers;
    this.machines[
      this.untrackedArrayPosition
    ].list.sort = this.sortForUntracked;

    this.machines[this.boomsArrayPosition].list.paginator = this.paginatorBooms;
    this.machines[
      this.scissorsArrayPosition
    ].list.paginator = this.paginatorScissors;
    this.machines[
      this.othersArrayPosition
    ].list.paginator = this.paginatorOthers;
    this.machines[
      this.untrackedArrayPosition
    ].list.paginator = this.paginatorUntracked;
  }
}

interface Machines {
  type: "boom" | "scissor" | "other" | "untracked";
  title: string;
  list: MatTableDataSource<MachineSummary>;
}
