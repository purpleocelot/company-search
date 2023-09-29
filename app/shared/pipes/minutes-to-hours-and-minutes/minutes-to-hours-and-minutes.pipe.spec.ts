import { MinutesToHoursAndMinutesPipe } from "./minutes-to-hours-and-minutes.pipe";

describe("MinutesToHoursAndMinutesPipe", () => {
  it("create an instance", () => {
    const pipe = new MinutesToHoursAndMinutesPipe();
    expect(pipe).toBeTruthy();
  });
});
