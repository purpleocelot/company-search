import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { GeoService } from "src/app/core/services/geo/geo.service";
import { MatSnackBar } from "@angular/material";
import { Country, countries } from "src/app/core/models/country.model";
import { Coordinates } from "src/app/core/models/locations.model";

@Component({
  selector: "loxam-location-select",
  templateUrl: "./location-select.component.html",
  styleUrls: ["./location-select.component.scss"]
})
export class LocationSelectComponent implements OnInit {
  public postcode: string;
  public country: Country;
  public countries: Array<Country> = countries;
  public loading: boolean = false;
  public readonly saveInfo: string = `The default latitude and longitude 
                                      have been updated to match the location
                                      displayed on the map.`;

  @Output() location: EventEmitter<Coordinates> = new EventEmitter<
    Coordinates
  >();

  constructor(
    private geoService: GeoService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  public getLocation(): void {
    this.loading = true;
    let xhr = this.geoService.getLatLongFromPostcode(
      this.postcode,
      this.country.code
    );
    let scope = this;
    xhr.onreadystatechange = function(a) {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = JSON.parse(xhr.responseText);
        if (response.status === "OK") {
          scope.location.emit(
            new Coordinates(
              response.results[0].geometry.location.lat,
              response.results[0].geometry.location.lng
            )
          );
          scope.matSnackBar.open(scope.saveInfo, "OK", {
            duration: 10000
          });
        } else {
          let errorMessage: string = "Unknown Error";
          switch (response.status) {
            case "ZERO_RESULTS":
              errorMessage = "No results were found for this address.";
              break;
            case "OVER_DAILY_LIMIT":
              errorMessage =
                "The limit on queries for today has been exceeded. Please contact your system administrator to inform them of this error. ";
              break;
            case "OVER_QUERY_LIMIT":
              errorMessage =
                "Daily quota limit has been exceeded. Please try again tomorrow.";
              break;
            case "REQUEST_DENIED":
              errorMessage = "The request was denied.";
              break;
            case "INVALID_REQUEST":
              errorMessage =
                "That was an invalid request. Please check and try again with some updated values.";
              break;
          }
          scope.error(errorMessage, response);
        }
        scope.loading = false;
      }
    };
    xhr.send();
  }

  private error(errorString: string, returnedError: any) {
    if (
      returnedError &&
      returnedError.error &&
      returnedError.error.exceptionMessage
    ) {
      errorString += `(${returnedError.error.exceptionMessage})`;
    } else if (
      returnedError &&
      returnedError.error &&
      returnedError.error.message
    ) {
      errorString += `(${returnedError.error.message})`;
    } else {
      errorString += "(Unknown error)";
    }

    this.matSnackBar.open(`ERROR: ${errorString}`, "dismiss", {
      duration: 10000
    });
  }
}
