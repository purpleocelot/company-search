import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Location } from "../../models/locations.model";

@Injectable()
export class AllSitesMachineLocationResolverService
  implements Resolve<Observable<Array<Location>>> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.httpService.get<Array<Location>>(`machines`);
  }
}
