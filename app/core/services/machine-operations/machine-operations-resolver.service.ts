import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { MachineSummary } from "../../models/machine-summary.model";
import { MachineOperation } from "../../models/machine-operations.model";

@Injectable()
export class MachineOperationsResolverService
  implements Resolve<Observable<Array<MachineOperation>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");

    return this.httpService.get<Array<MachineOperation>>(
      `machines/${siteId}/operations`
    );
  }
}
