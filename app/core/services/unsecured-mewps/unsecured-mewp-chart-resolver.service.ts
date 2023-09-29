import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { ChartAggregation } from "../../models/chart-aggregation.model";

@Injectable()
export class OperationalAlertsUnsecuredMewpChartResolverService
  implements Resolve<Observable<ChartAggregation>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");

    return this.httpService.get<ChartAggregation>(
      `machines/${siteId}/operational-unsecured-chart`
    );
  }
}
