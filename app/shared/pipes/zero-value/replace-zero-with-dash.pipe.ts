import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "replaceZeroWithDash"
})
export class ReplaceZeroWithDashPipe implements PipeTransform {
  constructor() {}

  transform(value: any, args?: any): any {
    if (value == 0 || value === null) {
      return "-";
    } else {
      return value;
    }
  }
}
