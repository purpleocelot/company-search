import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { MachineSiteAlertSummary } from "../../models/site-summary.model";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { MachineSummary } from "../../models/machine-summary.model";

@Injectable()
export class MachineSummaryResolverService
  implements Resolve<Observable<MachineSummary>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");
    const machineId = route.paramMap.get("machineId");

    return this.httpService.get<MachineSummary>(
      `machines/${siteId}/${machineId}/machine-summary`
    );
  }
}
