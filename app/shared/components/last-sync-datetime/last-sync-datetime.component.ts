import { Component, OnInit, OnDestroy } from "@angular/core";
import { LastDataSyncService } from "src/app/core/services/last-data-sync/last-data-sync.service";
import { Subscription } from "rxjs";
import { PollingService } from "src/app/core/services/polling/polling.service";
import { PollingJobItem } from "src/app/core/models/polling-job.model";

@Component({
  selector: "loxam-last-sync-datetime",
  templateUrl: "./last-sync-datetime.component.html",
  styleUrls: ["./last-sync-datetime.component.scss"]
})
export class LastSyncDatetimeComponent implements OnInit, OnDestroy {
  public datetime: string;

  private lastDataSyncServiceSub: Subscription;
  private readonly timezone: string = "Greenwich Mean Time";
  private readonly RECHECK_LAST_DATA_SYNC_IN_MILLISECONDS = 120000;

  constructor(
    private lastDataSyncService: LastDataSyncService,
    private pollingService: PollingService
  ) {}

  ngOnInit() {
    this.pollingService.addJob(
      new PollingJobItem(
        "last-data-sync",
        this.RECHECK_LAST_DATA_SYNC_IN_MILLISECONDS,
        this.getLastDataSync,
        this
      )
    );
  }

  getLastDataSync(): void {
    this.lastDataSyncServiceSub = this.lastDataSyncService
      .get(this.timezone)
      .subscribe(response => {
        this.datetime = response;
      });
  }

  ngOnDestroy() {
    if (this.lastDataSyncServiceSub) {
      this.lastDataSyncServiceSub.unsubscribe();
    }
  }
}
