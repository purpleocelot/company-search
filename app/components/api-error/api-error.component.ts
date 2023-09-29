import { Component, OnInit } from "@angular/core";

@Component({
  selector: "loxpad-api-error",
  templateUrl: "./api-error.component.html",
  styleUrls: ["./api-error.component.scss"]
})
export class ApiErrorComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  back() {
    window.history.back();
  }
}
