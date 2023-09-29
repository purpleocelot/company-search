import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve } from "@angular/router";
import { LoaderService } from "../loader/loader.service";
import { Site } from "../../models/sites.model";

@Injectable()
export class AdminSiteListResolverService
  implements Resolve<Observable<Array<Site>>> {
  constructor(
    private loaderService: LoaderService,
    private httpService: HttpService
  ) {}

  resolve() {
    this.loaderService.startLoading("get-sites");
    return this.httpService.get<Array<Site>>(`site`);
  }
}
