import { Injectable, EventEmitter, OnInit } from "@angular/core";
import {
  LoadingProcess,
  LoadingProcessItem
} from "../../models/loading-event.model";
import { environment } from "src/environments/environment";
import { PollingJob } from "../../models/polling-job.model";

@Injectable({
  providedIn: "root"
})
export class PollingService {
  public jobs: Array<PollingJob> = new Array<PollingJob>();
  public interval: number = environment.config.pollingInterval;
  public intervalId: any;

  public initialise() {
    this.intervalId = setInterval(() => {
      this.checkJobs();
    }, this.interval);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private checkJobs(): void {
    this.jobs.forEach(o => {
      let threshold = new Date(Date.now() - o.interval);
      if (!o.lastExecuted || o.lastExecuted < threshold) {
        o.function.apply(o.scope);
        o.lastExecuted = new Date(Date.now());
      }
    });
  }

  public addJob(job: PollingJob) {
    this.jobs.push(job);
  }
}
