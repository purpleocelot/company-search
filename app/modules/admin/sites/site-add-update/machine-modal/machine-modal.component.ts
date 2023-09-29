import { Component, Inject, ViewChild } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatTable,
  MatSort
} from "@angular/material";
import { MachineModalConfig } from "src/app/core/models/machine-modal-config.model";
import { IMatchedMachine } from "src/app/core/models/sites.model";
import { sorting } from "src/app/shared/functions/sorting.function";

/*
  Re-usable dialog component

  Usage:

    Add the following imports:

      import { MatDialog } from '@angular/material';
      import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

    Then add the following to open the dialog:

      const dlg = this.dialog.open(DialogComponent, {
        data: { title: 'Save', message: 'Do you want to save?', icon: 'warning', primaryButton: 'Yes', secondaryButton: 'No' }
      });

    Then to subscribe to the dialog's result:

      dlg.afterClosed().subscribe((result: boolean) => {
        console.log(result);
      });

  Config:
    title: The dialog heading.
    message: The main text.
    icon (Optional): The name of the ng-material icon to display. Icon is omitted if null. Popular values are 'done', 'warning' and 'error'
    primaryButton (Optional): The text for the primary button, defaults to 'OK' if omitted.
    secondaryButton (Optional): The text for an optional secondary button. Secondary button is omitted if null.

  Result:
      The boolean result returned by subscribing to afterClose() is either true if the primary button is clicked, 
      false if the secondary button is clicked, or undefined if outside of the dialog is clicked.
*/

@Component({
  selector: "loxam-machine-modal",
  templateUrl: "./machine-modal.component.html",
  styleUrls: ["./machine-modal.component.scss"]
})
export class MachineModalComponent {
  public machineColumnsToDisplay = [
    "ecode",
    "itemDescription",
    "itemCategory",
    "itemPower"
  ];
  public machineDataSource: MatTableDataSource<IMatchedMachine>;

  @ViewChild("machinesTable") machinesTable: MatTable<any>;
  @ViewChild("machinesSort") machinesSort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.machinesSort = ms;
    this.setDataSourceAttributes();
  }

  constructor(@Inject(MAT_DIALOG_DATA) public config: MachineModalConfig) {}

  ngOnInit() {
    this.machineDataSource = new MatTableDataSource<IMatchedMachine>(
      this.config.machines
    );
    this.setDataSourceAttributes();
  }

  private setDataSourceAttributes(): void {
    this.machineDataSource.sortingDataAccessor = sorting;
    this.machineDataSource.sort = this.machinesSort;
  }
}
