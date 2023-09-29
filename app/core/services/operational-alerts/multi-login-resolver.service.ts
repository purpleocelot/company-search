import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { MultiLoginAlerts } from "../../models/multi-login-alert.model";

@Injectable()
export class OperationalAlertsMultiLoginResolverService
  implements Resolve<Observable<Array<MultiLoginAlerts>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");

    return this.httpService.get<Array<MultiLoginAlerts>>(
      `operators/${siteId}/operational-multi-login`
    );
  }
}
