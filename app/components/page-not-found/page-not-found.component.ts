import { Component, OnInit } from "@angular/core";

@Component({
  selector: "loxpad-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"]
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  back() {
    window.history.back();
  }
}
