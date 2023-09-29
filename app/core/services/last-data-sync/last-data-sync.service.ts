import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { SiteModule } from "src/app/modules/site/site.module";

@Injectable({
  providedIn: "root"
})
export class LastDataSyncService {
  constructor(private httpService: HttpService) {}

  get(timeZoneId: string): Observable<string> {
    return this.httpService.get<string>(
      `site/last-data-sync-date/${timeZoneId}`
    );
  }
}
