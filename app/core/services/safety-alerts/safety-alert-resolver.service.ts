import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { SafetyAlerts } from "../../models/safety-alert.model";

@Injectable()
export class OperationalAlertsSafetyResolverService
  implements Resolve<Observable<Array<SafetyAlerts>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");

    return this.httpService.get<Array<SafetyAlerts>>(
      `machines/${siteId}/safety-alerts`
    );
  }
}
