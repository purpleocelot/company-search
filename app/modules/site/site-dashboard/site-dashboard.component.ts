import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SiteSummary } from "src/app/core/models/site-summary.model";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "loxam-site-dashboard",
  templateUrl: "./site-dashboard.component.html",
  styleUrls: ["./site-dashboard.component.scss"]
})
export class SiteDashboardComponent implements OnInit {
  public siteSummary: SiteSummary;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.siteSummary) {
        this.siteSummary = data.siteSummary;
        this.userService.setSelectedSite(this.siteSummary);
      }
    });

    if (this.router.url.match("^/site/[0-9]+/*$"))
      this.router.navigate(["overview"], { relativeTo: this.route });
  }
}
