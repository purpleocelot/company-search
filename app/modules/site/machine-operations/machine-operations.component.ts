import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MachineOperation } from "src/app/core/models/machine-operations.model";
import { OperatorUsageEvent } from "src/app/core/models/operator-summary.model";
import { DateService } from "src/app/core/services/date/date.service";
import { environment } from "src/environments/environment";
import { clone } from "src/app/shared/functions/clone.function";

@Component({
  selector: "loxam-machine-operations",
  templateUrl: "./machine-operations.component.html",
  styleUrls: ["./machine-operations.component.scss"]
})
export class MachineOperationsComponent implements OnInit {
  public fromDate: Date;
  public toDate: Date = new Date(Date.now());
  public dateOffset: number;
  public machineOperations: Array<MachineOperation>;
  public filteredMachineOperations: Array<MachineOperation>;

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.machineOperations = resolved.machineOperations;
      this.refreshDateDependentData(
        this.dateService.dateFromXDaysAgo(
          environment.config.defaultAmountOfDaysHistoryToShow
        )
      );
    });
  }

  private filterMachineOperations(): void {
    if (this.machineOperations) {
      this.filteredMachineOperations = clone(this.machineOperations);

      this.filteredMachineOperations.forEach(event => {
        event.usage = 0;
        event.usages.forEach(usage => {
          if (new Date(usage.eventDate) >= this.fromDate)
            event.usage += usage.usage;
        });
      });
    }
  }

  public refreshDateDependentData(fromDate: Date) {
    this.fromDate = fromDate;
    this.dateOffset = this.dateService.dateDiffInDays(
      this.fromDate,
      this.toDate
    );
    this.filterMachineOperations();
  }
}
