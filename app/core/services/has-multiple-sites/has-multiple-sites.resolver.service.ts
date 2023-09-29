import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { SiteSummary } from "../../models/site-summary.model";
import { Resolve } from "@angular/router";

@Injectable()
export class HasMultipleSitesResolverService
  implements Resolve<Observable<SiteSummary>> {
  constructor(private httpService: HttpService) {}

  resolve() {
    return this.httpService.get<SiteSummary>(`site/has-multiple-sites`);
  }
}
