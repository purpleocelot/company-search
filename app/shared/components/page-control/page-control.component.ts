import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DateService } from "src/app/core/services/date/date.service";

@Component({
  selector: "loxam-page-control",
  templateUrl: "./page-control.component.html",
  styleUrls: ["./page-control.component.scss"]
})
export class PageControlComponent implements OnInit {
  @Output() dateChanged: EventEmitter<Date> = new EventEmitter<Date>();
  @Input() showSlider: boolean = true;
  @Input() title: string;
  @Input() alerts;

  public dateOffset: number = 7;
  public fromDate: Date;
  public toDate: Date = new Date(Date.now());

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.setFromDate(this.dateOffset);
  }

  public refreshDateDependentData() {
    this.setFromDate(this.dateOffset);
    this.dateChanged.emit(this.dateService.dateFromXDaysAgo(this.dateOffset));
  }

  private setFromDate(daysToGoBack: number): void {
    this.dateOffset = Math.round(daysToGoBack);
    this.fromDate = new Date(
      new Date().setDate(new Date().getDate() - this.dateOffset)
    );
  }

  public sliderChanging(event) {
    this.setFromDate(event.value);
  }
}
