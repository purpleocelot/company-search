import { UnknownDatePipe } from "./unknown-date.pipe";

describe("UnknownDatePipe", () => {
  it("create an instance", () => {
    const pipe = new UnknownDatePipe();
    expect(pipe).toBeTruthy();
  });
});
