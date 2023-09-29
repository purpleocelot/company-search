import { Injectable } from "@angular/core";
import { UserDto, User } from "../../models/user.model";
import { Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { CoreModule } from "../../core.module";
import { UICompany } from "../../models/ui-company.model";
import {
  Site,
  ISiteDefinition,
  IMatchedMachine
} from "../../models/sites.model";
import { IWorkingHours } from "../../models/time.model";
import { toUrlParamString } from "src/app/shared/functions/toUrlString.function";

@Injectable({
  providedIn: CoreModule
})
export class AdminSiteService {
  constructor(private httpService: HttpService) {}

  public getSitesByUrl(url: string): Observable<Array<Site>> {
    if (url === "") {
      return this.httpService.get<Array<Site>>(`site/get-sites-by-url?url=""`);
    } else {
      return this.httpService.get<Array<Site>>(
        `site/get-sites-by-url?url=${url}`
      );
    }
  }

  public getSiteWorkingHours(siteId: number): Observable<Array<IWorkingHours>> {
    return this.httpService.get<Array<IWorkingHours>>(
      `site/work-hours/${siteId}`
    );
  }

  public getSiteDefinitions(
    siteId: number
  ): Observable<Array<ISiteDefinition>> {
    return this.httpService.get<Array<ISiteDefinition>>(
      `site/definitions/${siteId}`
    );
  }

  public saveSiteDefinitions(
    siteId: number,
    siteDefinitions: ISiteDefinition[]
  ): any {
    return this.httpService.post(`site/definitions/${siteId}`, siteDefinitions);
  }

  public getMatchingMachines(
    definition: ISiteDefinition
  ): Observable<Array<IMatchedMachine>> {
    return this.httpService.get(
      `site/matching-machines?${toUrlParamString(definition, false, false)}`
    );
  }

  public saveSite(definition: Site) {
    if (definition.siteId == null || definition.siteId < 1)
      return this.httpService.post(`site`, definition);
    else return this.httpService.put(`site/${definition.siteId}`, definition);
  }
}
