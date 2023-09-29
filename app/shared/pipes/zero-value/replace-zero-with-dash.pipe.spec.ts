import { ReplaceZeroWithDashPipe } from "./replace-zero-with-dash.pipe";

describe("ReplaceZeroWithDashPipe", () => {
  it("create an instance", () => {
    const pipe = new ReplaceZeroWithDashPipe();
    expect(pipe).toBeTruthy();
  });
});
