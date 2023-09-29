import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { SiteSummary } from "../../models/site-summary.model";

import { CoreModule } from "../../core.module";
import { Router } from "@angular/router";
import { UsageHistoryItem } from "../../models/usage-history.model";
import { UserService } from "../user/user.service";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "../../models/locations.model";

@Injectable({
  providedIn: CoreModule
})
export class GeoService {
  constructor() {}

  getLatLongFromPostcode(postcode: string, country: string): XMLHttpRequest {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode},%20${country}&key=${
        environment.googleMapsApiKey
      }`
    );
    return xhr;
  }
}
