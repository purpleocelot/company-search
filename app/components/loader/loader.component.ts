import { Component, OnInit } from "@angular/core";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "loxam-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
  public loading: boolean;
  public isBrowserIE: boolean;

  constructor(public loaderService: LoaderService) {
    this.isBrowserIE = environment.isIE11;
  }

  ngOnInit() {
    this.loaderService.loadingStateEventEmmitter.subscribe(
      loading => (this.loading = loading)
    );
  }
}
