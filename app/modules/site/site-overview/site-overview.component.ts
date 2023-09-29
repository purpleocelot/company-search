import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "src/app/core/models/locations.model";
import { MenuService } from "src/app/core/services/menu/menu.service";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "loxam-site-overview",
  templateUrl: "./site-overview.component.html",
  styleUrls: ["./site-overview.component.scss"]
})
export class SiteOverviewComponent implements OnInit {
  public machineLocations: Array<Location>;
  public defaultMapCenterLat: number;
  public defaultMapCenterLong: number;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      if (data.machineLocations) {
        this.machineLocations = data.machineLocations;
      }
      this.menuService.changeMenuState(true);

      this.defaultMapCenterLat = this.userService.userSettings.selectedSite.siteDefaultLatitude;
      this.defaultMapCenterLong = this.userService.userSettings.selectedSite.siteDefaultLongitude;
    });
  }
}
