import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { SiteSummary } from "../../models/site-summary.model";

import { CoreModule } from "../../core.module";

@Injectable({
  providedIn: CoreModule
})
export class SiteService {
  private selectedSite: Observable<SiteSummary>;

  constructor(private httpService: HttpService) {}

  getBySiteId(siteId: string): Observable<SiteSummary> {
    this.selectedSite = this.httpService.get<SiteSummary>(
      `site/${siteId}/summary`
    );
    return this.selectedSite;
  }

  getAllSites(): Observable<Array<SiteSummary>> {
    return this.httpService.get<Array<SiteSummary>>(`site/summary`);
  }
}
