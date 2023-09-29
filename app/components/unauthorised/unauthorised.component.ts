import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "loxpad-unauthorised",
  templateUrl: "./unauthorised.component.html",
  styleUrls: ["./unauthorised.component.scss"]
})
export class UnauthorisedComponent implements OnInit {
  public reason: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.reason = params.get("reason");
    });
  }

  back() {
    window.history.back();
  }
}
