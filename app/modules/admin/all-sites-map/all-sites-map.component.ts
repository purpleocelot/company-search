import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "loxam-all-sites-map",
  templateUrl: "./all-sites-map.component.html",
  styleUrls: ["./all-sites-map.component.scss"]
})
export class AllSitesMapComponent implements OnInit {
  allMachineLocations: Array<Location>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.machineLocations) {
        this.allMachineLocations = data.machineLocations;
      }
    });
  }
}
