import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minutesToHoursAndMinutes"
})
export class MinutesToHoursAndMinutesPipe implements PipeTransform {
  transform(value: number, args?: any): string | number {
    if (value) {
      return this.getHoursAndMinutesString(value);
    } else {
      return "00:00";
    }
  }

  private getHoursAndMinutesString(minutesDiff: number): string {
    let hours = Math.round((minutesDiff - (minutesDiff % 60)) / 60);
    let minutes = Math.round(minutesDiff % 60);
    let hoursString = hours < 10 ? `0${hours}` : hours;
    let minuteString = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursString}:${minuteString}`;
  }
}
