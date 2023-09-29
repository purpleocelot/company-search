import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { ChartAggregation } from "../../models/chart-aggregation.model";

@Injectable()
export class MachineUtilisationResolverService
  implements Resolve<Observable<ChartAggregation>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");
    const machineId = route.paramMap.get("machineId");

    return this.httpService.get<ChartAggregation>(
      `utilisation/${siteId}/${machineId}/machine-utilisation`
    );
  }
}
