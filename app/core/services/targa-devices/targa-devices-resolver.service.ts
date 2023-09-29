import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve } from "@angular/router";
import { TargaLocation } from "../../models/targa-location.model";

@Injectable()
export class TargaDevicesResolverService
  implements Resolve<Observable<Array<TargaLocation>>> {
  constructor(private httpService: HttpService) {}

  resolve() {
    return this.httpService.get<Array<TargaLocation>>("admin/targa/locations");
  }
}
