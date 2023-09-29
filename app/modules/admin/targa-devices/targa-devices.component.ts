import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TargaLocation } from "src/app/core/models/targa-location.model";
import { Location } from "src/app/core/models/locations.model";

@Component({
  selector: "loxam-targa-devices",
  templateUrl: "./targa-devices.component.html",
  styleUrls: ["./targa-devices.component.scss"]
})
export class TargaDevicesComponent implements OnInit {
  public readonly pageTitle: string = "Targa Devices";
  public deviceLocations: Array<TargaLocation>;
  public locations: Array<Location>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(
      (resolved: { locations: Array<TargaLocation> }) => {
        if (resolved.locations) {
          this.locations = resolved.locations.map<Location>(item => {
            return {
              itemDescription: item.vehicleName,
              latitude: item.currentLatitude,
              longitude: item.currentLongitude,
              deviceType: "Targa",
              eCode: "",
              machineKey: undefined,
              siteKey: undefined
            };
          });
        }
      }
    );
  }
}
