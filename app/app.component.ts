import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./core/services/user/user.service";
import { Language } from "src/app/core/models/language.model";
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  NavigationStart,
  NavigationCancel,
  NavigationEnd
} from "@angular/router";
import { LoaderService } from "./core/services/loader/loader.service";
import { LoggingService } from "./core/services/logging/logging.service";
import { AnalyticsService } from "./core/services/analytics/analytics.service";

@Component({
  selector: "loxpad-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private loggingService: LoggingService,
    private analyticsService: AnalyticsService
  ) {
    // TODO: Take this from the user settings from the last time the user selected, otherwise use english.
    let lang: Language;

    lang = { code: "", name: "Default", orientation: "ltr" };
    lang.code = localStorage.getItem("lang") || environment.defaultLanguage;
    this.userService.setLanguage(lang);
    this.translate.setDefaultLang(lang.code);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loaderService.startLoading("route-config-load");
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loaderService.stopLoading("route-config-load");
      }

      if (event instanceof NavigationStart) {
        this.loaderService.startLoading("navigation");
      } else if (event instanceof NavigationEnd) {
        this.loaderService.stopLoading("navigation");
        this.loggingService.logRoot();
        this.analyticsService.googelPageTracking(event);
      } else if (event instanceof NavigationCancel) {
        this.loaderService.stopLoading("navigation");
      }
    });
  }
}
