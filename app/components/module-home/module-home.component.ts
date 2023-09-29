import { Component, OnInit, OnDestroy } from "@angular/core";
import { SidebarMenuItems } from "src/app/core/interfaces/sidebarmenu.interface";
import { UserService } from "src/app/core/services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuService } from "src/app/core/services/menu/menu.service";
import { Subscription } from "rxjs";
import { UserSettings } from "src/app/core/models/user-settings.model";
import { QueueJSEvent } from "src/app/core/decorators/queue-js-event.decorator";
import { SiteSummary } from "src/app/core/models/site-summary.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "loxpad-module-home",
  templateUrl: "./module-home.component.html",
  styleUrls: ["./module-home.component.scss"]
})
export class ModuleHomeComponent implements OnInit, OnDestroy {
  public menuItems: SidebarMenuItems;
  public menuOpen: boolean;
  public site: SiteSummary;
  public useSiteIdForNavigation: boolean;
  public ignoreSiteIdInRouterLink: boolean;
  public hasMultipleSites: boolean;

  private menuServiceSub: Subscription;
  private userServiceSub: Subscription;
  public isIE11: boolean = environment.isIE11;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(v => {
      this.menuItems = v.menuItems;
      this.useSiteIdForNavigation = v.useSiteIdForNavigation;
      this.ignoreSiteIdInRouterLink = v.ignoreSiteIdInRouterLink;
      this.hasMultipleSites = v.hasMultipleSites;
    });

    this.menuServiceSub = this.menuService.menuStateEvent.subscribe(
      newMenuState => {
        this.menuOpen = newMenuState;
      }
    );

    this.userServiceSub = this.userService.userSettingsChanged.subscribe(
      (user: UserSettings) => {
        this.updateSiteId(user);
      }
    );

    if (this.router.url !== "/site") {
      this.setDefaultMenuState();
    }
  }

  ngOnDestroy() {
    if (this.menuServiceSub) {
      this.menuServiceSub.unsubscribe();
    }
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe();
    }
  }

  closeMenu(): void {
    this.menuService.changeMenuState(false);
    this.menuOpen = false;
  }

  @QueueJSEvent()
  private setDefaultMenuState(): void {
    this.menuService.changeMenuState(true);
  }

  @QueueJSEvent()
  private updateSiteId(user: UserSettings): void {
    this.site = user.selectedSite;
  }
}
