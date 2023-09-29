import { Injectable, EventEmitter } from "@angular/core";
import {
  LoadingProcess,
  LoadingProcessItem
} from "../../models/loading-event.model";
import { environment } from "src/environments/environment";
import { PollingService } from "../polling/polling.service";
import { PollingJobItem } from "../../models/polling-job.model";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  private readonly RECHECK_LOADER_STATE_AMOUNT_IN_MILLISECONDS = 5000;
  public readonly STANDARD_TIMESPAN =
    environment.config.maxLoadingTimespanInMilliseconds;
  private events: Array<LoadingProcess> = new Array<LoadingProcess>();
  public loadingStateEventEmmitter: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor(private pollingService: PollingService) {
    this.pollingService.addJob(
      new PollingJobItem(
        "loader-service",
        this.RECHECK_LOADER_STATE_AMOUNT_IN_MILLISECONDS,
        this.checkLoading,
        this
      )
    );
  }

  ngOnInit() {}

  public startLoading(
    key: string,
    maxLengthOfTimeToAllowForProcess: number = this.STANDARD_TIMESPAN
  ): void {
    let now = new Date();
    this.events.push(
      new LoadingProcessItem(key, now, maxLengthOfTimeToAllowForProcess)
    );

    let processesStillRunning = this.events.length > 0;
    this.loadingStateEventEmmitter.emit(processesStillRunning);
  }

  public stopLoading(key: string): void {
    this.events.splice(
      this.events.findIndex(
        o => o.key.toLocaleLowerCase() === key.toLocaleLowerCase()
      ),
      1
    );
    this.checkLoading();
  }

  public checkLoading(): void {
    let processesStillRunning: number = this.events.length;
    let expired = this.events.filter((o: LoadingProcessItem) => o.expired());
    if (expired.length === processesStillRunning) {
      this.events = new Array<LoadingProcessItem>();
      this.loadingStateEventEmmitter.emit(false);
    } else {
      this.loadingStateEventEmmitter.emit(true);
    }
  }
}
