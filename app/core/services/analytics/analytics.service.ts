import { Injectable } from "@angular/core";
import { CoreModule } from "../../core.module";
import { Event, NavigationEnd } from "@angular/router";

@Injectable({
  providedIn: CoreModule
})
export class AnalyticsService {
  constructor() {}

  googelPageTracking(event: Event): void {
    if (event instanceof NavigationEnd) {
      (<any>window).ga("set", "page", event.urlAfterRedirects);
      (<any>window).ga("send", "pageview");
    }
  }

  sendAnalyticsEvent(
    category: string,
    label: string,
    action: string,
    value?: number
  ): void {
    if (!category || !label || action) return;

    (<any>window).ga("send", "event", {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: value
    });
  }
}
