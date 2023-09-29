import { Component, OnInit, Input } from "@angular/core";
import { Location } from "src/app/core/models/locations.model";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "loxam-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() locations: Array<Location>;
  @Input() clickable: boolean = true;
  @Input() zoomOverride: boolean;
  @Input() mapCenterLat: number = undefined;
  @Input() mapCenterLong: number = undefined;
  @Input() allowNoSiteLink: boolean = false;
  iconUrl: string;
  zoom: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.setMarkerTheme();
    if (this.locations.length > 0) {
      this.calculateMapCenter();
    }

    if (this.zoomOverride || this.locations.length === 0) {
      this.zoom = environment.config.zoomOverrideLevel;
    } else {
      this.calculateMapZoom();
    }
  }

  goToMachine(location: Location) {
    if (!this.clickable) return;

    let url = this.allowNoSiteLink
      ? `/site/${location.siteKey}/machine-detail/${location.machineKey}`
      : `../machine-detail/${location.machineKey}`;

    this.router.navigate([url], {
      relativeTo: this.route
    });
  }

  private calculateMapZoom(): any {
    // TODO: This may need to be amended to give a better representation of the map window, but for now we are happy with a rough size
    let mapDimensions = {
      height: 500,
      width: 500
    };
    this.zoom = this.getBoundsZoomLevel(mapDimensions);
  }

  private getBoundsZoomLevel(mapDim): number {
    let WORLD_DIM = { height: 256, width: 256 };
    let ZOOM_MAX = 21;

    let ne = this.getNorthEast();
    let sw = this.getSouthWest();

    let latFraction =
      (this.latitudinalRadius(ne.lat) - this.latitudinalRadius(sw.lat)) /
      Math.PI;

    let lngDiff = ne.lng - sw.lng;
    let lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

    let latZoom = this.zoomLevel(mapDim.height, WORLD_DIM.height, latFraction);
    let lngZoom = this.zoomLevel(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }

  private latitudinalRadius(lat) {
    let sin = Math.sin((lat * Math.PI) / 180);
    let radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  private zoomLevel(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  private getSouthWest(): Bounds {
    let bounds: Bounds = new Bounds();
    bounds.lat = Math.min.apply(
      Math,
      this.locations.map(function(o) {
        return o.latitude;
      })
    );
    bounds.lng = Math.min.apply(
      Math,
      this.locations.map(function(o) {
        return o.longitude;
      })
    );

    return bounds;
  }

  private getNorthEast(): Bounds {
    let bounds: Bounds = new Bounds();
    bounds.lat = Math.max.apply(
      Math,
      this.locations.map(function(o) {
        return o.latitude;
      })
    );
    bounds.lng = Math.max.apply(
      Math,
      this.locations.map(function(o) {
        return o.longitude;
      })
    );

    return bounds;
  }

  private setMarkerTheme(): any {
    // TODO: Introduce theme service? get the icon name or colour from there and set the icon URL based on that theme value.
    this.iconUrl = this.userService.userSettings.selectedUICompany.mapIconUrl;
  }

  private calculateMapCenter(): void {
    let count = this.locations.length;
    let totalLat = this.locations.reduce((prev, current) => {
      return prev + current.latitude;
    }, 0);
    let totalLong = this.locations.reduce((prev, current) => {
      return prev + current.longitude;
    }, 0);
    this.mapCenterLat = totalLat / count;
    this.mapCenterLong = totalLong / count;
  }
}

export class Bounds {
  constructor() {}

  lat: number;
  lng: number;
}
