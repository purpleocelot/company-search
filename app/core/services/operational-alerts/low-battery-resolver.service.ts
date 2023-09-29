import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { LowBatteryAlerts } from "../../models/low-battery-alert.model";

@Injectable()
export class OperationalAlertsLowBatteryResolverService
  implements Resolve<Observable<Array<LowBatteryAlerts>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");

    return this.httpService.get<Array<LowBatteryAlerts>>(
      `machines/${siteId}/operational-low-battery`
    );
  }
}
