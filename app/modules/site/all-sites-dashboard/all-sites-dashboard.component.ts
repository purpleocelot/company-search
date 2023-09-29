import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SiteSummary } from "src/app/core/models/site-summary.model";
import { MatTableDataSource } from "@angular/material/table";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { MenuService } from "src/app/core/services/menu/menu.service";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "loxam-all-sites-dashboard",
  templateUrl: "./all-sites-dashboard.component.html",
  styleUrls: ["./all-sites-dashboard.component.scss"]
})
export class AllSitesDashboardComponent implements OnInit, AfterViewInit {
  public allSitesSummary: Array<SiteSummary>;
  public dataSource;
  public columnsToDisplay = [
    "Site",
    "Safety",
    "Operational",
    "Unsecured",
    "MEWPs",
    "Booms",
    "Scissors",
    "Other",
    "Untracked",
    "Contractors",
    "Operators"
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private menuService: MenuService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.allSiteSummary) {
        this.allSitesSummary = data.allSiteSummary;
        this.dataSource = new MatTableDataSource(this.allSitesSummary);
        this.loaderService.stopLoading("site-summary");
      }

      // handle auto redirect to single site
      if (this.allSitesSummary.length === 1) {
        this.router.navigate([this.allSitesSummary[0].siteId], {
          relativeTo: this.route
        });
      }

      this.userService.clearSelectedSite();
    });
  }

  ngAfterViewInit() {
    this.menuService.changeMenuState(false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
