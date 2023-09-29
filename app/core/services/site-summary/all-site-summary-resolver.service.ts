import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { SiteSummary } from "../../models/site-summary.model";
import { Resolve } from "@angular/router";
import { LoaderService } from "../loader/loader.service";
import { SiteService } from "../site/site.service";

@Injectable()
export class AllSiteSummaryResolverService
  implements Resolve<Observable<Array<SiteSummary>>> {
  constructor(
    private loaderService: LoaderService,
    private siteService: SiteService
  ) {}

  resolve() {
    this.loaderService.startLoading("site-summary", 60000);
    return this.siteService.getAllSites();
  }
}
