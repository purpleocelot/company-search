import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DateService {
  private readonly MS_PER_DAY = 24 * 60 * 60 * 1000;

  constructor() {}

  dateDiffInDays(a: Date, b: Date) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / this.MS_PER_DAY);
  }

  dateFromXDaysAgo(amountOfDays: number): Date {
    var b = new Date(new Date().setHours(0, 0, 0, 0));
    b.setDate(b.getDate() - amountOfDays);
    return b;
  }
}
