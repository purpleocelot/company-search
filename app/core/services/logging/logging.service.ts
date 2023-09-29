import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { SiteSummary } from "../../models/site-summary.model";

import { CoreModule } from "../../core.module";
import { Router } from "@angular/router";
import { UsageHistoryItem } from "../../models/usage-history.model";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: CoreModule
})
export class LoggingService {
  constructor(
    private httpService: HttpService,
    private userService: UserService
  ) {}

  logRoot(): void {
    let username: string = this.userService.token
      ? this.userService.token.userName
      : "";
    let siteId: number = this.userService.userSettings.selectedSite
      ? this.userService.userSettings.selectedSite.siteId
      : null;
    let event: UsageHistoryItem = new UsageHistoryItem(
      username,
      location.href,
      siteId
    );
    this.httpService.post(`/usagehistory/insert`, event).subscribe();
  }
}
