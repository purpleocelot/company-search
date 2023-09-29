import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { OperatorSummary } from "../../models/operator-summary.model";

@Injectable()
export class OperatorActivityResolverService
  implements Resolve<Observable<Array<OperatorSummary>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.parent.paramMap.get("siteId");

    return this.httpService.get<Array<OperatorSummary>>(`operators/${siteId}`);
  }
}
