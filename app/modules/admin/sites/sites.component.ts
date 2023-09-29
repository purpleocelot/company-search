import { Component, OnInit } from "@angular/core";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { ActivatedRoute } from "@angular/router";
import { Site } from "src/app/core/models/sites.model";
import { predicateBy } from "src/app/shared/functions/sorting.function";
import { PlatformLocation } from "@angular/common";
import { clone } from "src/app/shared/functions/clone.function";

@Component({
  selector: "loxam-sites",
  templateUrl: "./sites.component.html",
  styleUrls: ["./sites.component.scss"]
})
export class SitesComponent implements OnInit {
  public sites: Array<Site>;
  public selectedSite: Site;
  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private location: PlatformLocation
  ) {
    location.onPopState(() => {
      this.siteAddEditStop(this.selectedSite);
    });
  }

  ngOnInit() {
    this.route.data.subscribe((resolved: { sites: Array<Site> }) => {
      this.sites = resolved.sites.sort(predicateBy("siteName"));
      this.loaderService.stopLoading("get-admin-sites");
    });
  }

  public editingSite(site: Site) {
    if (site.siteId) {
      history.pushState(null, "Edit Site", `admin/sites/${site.siteId}`);
    } else {
      history.pushState(null, "Add Site", `admin/sites/add`);
    }
    this.selectedSite = clone(site);
  }

  public siteAddEditStop(siteFromAddEdit: Site): void {
    if (siteFromAddEdit) {
      let site: Site = this.sites.find(
        siteInCollection => siteInCollection.siteId === siteFromAddEdit.siteId
      );
      let position: number = this.sites.indexOf(site);
      if (position !== -1) {
        this.sites = this.sites.slice(position, 1);
      }
      this.sites.push(siteFromAddEdit);
      this.sites = this.sites.sort(predicateBy("siteName"));
    }
    this.selectedSite = undefined;
  }
}
