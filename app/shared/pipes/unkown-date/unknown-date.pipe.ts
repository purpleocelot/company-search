import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "unknownDate"
})
export class UnknownDatePipe implements PipeTransform {
  private readonly C_SHARP_EPOCH_DATE: Date = new Date("0001/01/01");
  private readonly JAVASCRIPT_EPOCH_DATE: Date = new Date("1900/01/01");

  constructor(private translationService: TranslateService) {}

  transform(value: any): any {
    let dateValue: Date = new Date(value);
    if (
      dateValue === null ||
      dateValue.getTime() === this.C_SHARP_EPOCH_DATE.getTime() ||
      dateValue.getTime() === this.JAVASCRIPT_EPOCH_DATE.getTime()
    ) {
      return this.translationService.instant("Unknown");
    } else {
      return value;
    }
  }
}
