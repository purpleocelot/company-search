import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Resolve } from "@angular/router";
import { UsageHistoryService } from "./usage-history.service";
import { IUsageHistorySummary } from "../../models/usage-history-summary.model";

@Injectable()
export class UsageHistoryResolverService
  implements Resolve<Observable<Array<IUsageHistorySummary>>> {
  constructor(private usageHistoryService: UsageHistoryService) {}

  resolve() {
    return this.usageHistoryService.getHistorySummary();
  }
}
