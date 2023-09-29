import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { UtilisationService } from "./utilisation.service";
import { ChartAggregation } from "../../models/chart-aggregation.model";

@Injectable()
export class AllMachineUtilisationResolverService
  implements Resolve<Observable<ChartAggregation>> {
  constructor(private utilisationService: UtilisationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");
    return this.utilisationService.getAllMachineUtilisation(Number(siteId));
  }
}
