import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { DailyUsageRecord } from "../../models/machine-usage.model";

@Injectable()
export class MachineUsageResolverService
  implements Resolve<Observable<DailyUsageRecord>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");
    const machineId = route.paramMap.get("machineId");

    return this.httpService.get<DailyUsageRecord>(
      `machines/${siteId}/${machineId}/machine-usage`
    );
  }
}
