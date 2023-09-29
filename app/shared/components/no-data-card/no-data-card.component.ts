import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "loxam-no-data-card",
  templateUrl: "./no-data-card.component.html",
  styleUrls: ["./no-data-card.component.scss"]
})
export class NoDataCardComponent implements OnInit {
  @Input() title: string;
  @Input() showBadge: boolean;

  constructor() {}

  ngOnInit() {}
}
