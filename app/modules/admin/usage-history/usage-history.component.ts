import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IUsageHistorySummary } from "src/app/core/models/usage-history-summary.model";
import * as moment from "moment";
import { PlatformLocation } from "@angular/common";

@Component({
  selector: "loxam-usage-history",
  templateUrl: "./usage-history.component.html",
  styleUrls: ["./usage-history.component.scss"]
})
export class UsageHistoryComponent implements OnInit {
  public pageTitle: string = "Usage History";
  public usage: Array<IUsageHistorySummary>;
  public showDetailPanelComponent: boolean = false;
  public selectedUsageHistory: IUsageHistorySummary;

  constructor(
    private route: ActivatedRoute,
    private location: PlatformLocation
  ) {
    // when the user navigates back using the browser
    location.onPopState(() => {
      this.selectedUsageHistory = undefined;
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (resolved: { usage: Array<IUsageHistorySummary> }) => {
        if (resolved.usage) {
          this.usage = resolved.usage;
        }
      }
    );
  }

  public selectedSummaryCallback(usageSummary: IUsageHistorySummary) {
    this.selectedUsageHistory = usageSummary;

    // update pushState as we don't want to navigate to a new component, instead we swap
    // components and update browser history
    if (usageSummary.username) {
      history.pushState(
        null,
        "Usage History Details",
        `admin/usage-history/${usageSummary.username}`
      );
    }
  }
}
