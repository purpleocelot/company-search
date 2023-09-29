import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SiteSummary } from "../../models/site-summary.model";
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";
import { SiteService } from "../site/site.service";

@Injectable()
export class SingleSiteSummaryResolverService
  implements Resolve<Observable<SiteSummary>> {
  constructor(private siteService: SiteService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const siteId = route.paramMap.get("siteId");
    return this.siteService.getBySiteId(siteId);
  }
}
