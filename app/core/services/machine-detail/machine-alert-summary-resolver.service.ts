import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { MachineSiteAlertSummary } from "../../models/site-summary.model";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

@Injectable()
export class MachineAlertSummaryResolverService
  implements Resolve<Observable<MachineSiteAlertSummary>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");
    const machineId = route.paramMap.get("machineId");

    return this.httpService.get<MachineSiteAlertSummary>(
      `machines/${siteId}/${machineId}/machine-alert-summary`
    );
  }
}
