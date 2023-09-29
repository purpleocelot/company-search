import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { UnsecuredMewpAlerts } from "../../models/unsecured-mewp-alerts.model";

@Injectable()
export class OperationalAlertsUnsecuredMewpResolverService
  implements Resolve<Observable<Array<UnsecuredMewpAlerts>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");

    return this.httpService.get<Array<UnsecuredMewpAlerts>>(
      `machines/${siteId}/operational-unsecured`
    );
  }
}
