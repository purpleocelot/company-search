import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { MachineSummary } from "../../models/machine-summary.model";

@Injectable()
export class ScissorMachinesInventoryResolverService
  implements Resolve<Observable<Array<MachineSummary>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");
    const machineCategory = "scissor";

    return this.httpService.get<Array<MachineSummary>>(
      `machines/${siteId}/${machineCategory}`
    );
  }
}
