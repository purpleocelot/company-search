import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { MachineSiteAlertSummary } from "../../models/site-summary.model";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { OperatorSummary } from "../../models/operator-summary.model";

@Injectable()
export class OperatorSummaryResolverService
  implements Resolve<Observable<OperatorSummary>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");
    const operatorId = route.paramMap.get("operatorId");

    return this.httpService.get<OperatorSummary>(
      `operators/${siteId}/operator-summary/${operatorId}`
    );
  }
}
