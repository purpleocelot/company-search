import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "loxam-form-error",
  templateUrl: "./form-error.component.html",
  styleUrls: ["./form-error.component.scss"]
})
export class FormErrorComponent implements OnChanges {
  @Input() errorMessage: string;

  private msg: string;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes["errorMessage"]) return;

    const errorMessageChanges = changes["errorMessage"];
    this.msg = errorMessageChanges.currentValue;
  }
}
