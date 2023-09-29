import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Resolve } from "@angular/router";
import { LoaderService } from "../loader/loader.service";
import { AdminSiteService } from "./admin-site.service";
import { Site } from "../../models/sites.model";
import { environment } from "src/environments/environment";

@Injectable()
export class AdminSiteResolverService
  implements Resolve<Observable<Array<Site>>> {
  constructor(
    private loaderService: LoaderService,
    private adminSiteService: AdminSiteService
  ) {}

  resolve() {
    let url = environment.name === "dev" ? "" : location.host;
    this.loaderService.startLoading("get-admin-sites");
    return this.adminSiteService.getSitesByUrl(url);
  }
}
