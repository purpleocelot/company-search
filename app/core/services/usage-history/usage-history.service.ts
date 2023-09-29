import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { IUsageHistorySummary } from "../../models/usage-history-summary.model";
import { UsageHistory } from "../../models/usage-history.model";

@Injectable({
  providedIn: "root"
})
export class UsageHistoryService {
  constructor(private httpService: HttpService) {}

  getHistorySummary(): Observable<Array<IUsageHistorySummary>> {
    return this.httpService.get<Array<IUsageHistorySummary>>(
      `usage-history-summary`
    );
  }

  getHistoryDetail(userEmail: string): Observable<Array<UsageHistory>> {
    return this.httpService.get<Array<UsageHistory>>(
      `usage-history-detail/${userEmail}/`
    );
  }
}
