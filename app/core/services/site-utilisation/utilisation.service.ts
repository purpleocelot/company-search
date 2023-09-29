import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { ChartAggregation } from "../../models/chart-aggregation.model";
import { Observable } from "rxjs";
import { CoreModule } from "../../core.module";

@Injectable({
  providedIn: CoreModule
})
export class UtilisationService {
  constructor(private http: HttpService) {}

  public getAllMachineUtilisation(
    siteId: number
  ): Observable<ChartAggregation> {
    return this.getUtilisation(siteId, "all");
  }

  public getOtherMachineUtilisation(
    siteId: number
  ): Observable<ChartAggregation> {
    return this.getUtilisation(siteId, "other");
  }

  public getBoomMachineUtilisation(
    siteId: number
  ): Observable<ChartAggregation> {
    return this.getUtilisation(siteId, "boom");
  }

  public getScissorMachineUtilisation(
    siteId: number
  ): Observable<ChartAggregation> {
    return this.getUtilisation(siteId, "scissor");
  }

  private getUtilisation(
    siteId: number,
    type: string
  ): Observable<ChartAggregation> {
    return this.http.get<ChartAggregation>(
      `utilisation/${siteId}/${type}/utilisation-by-category`
    );
  }
}
