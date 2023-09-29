import { TestBed } from "@angular/core/testing";

import { UsageHistoryService } from "./usage-history.service";

describe("UsageHistoryService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: UsageHistoryService = TestBed.get(UsageHistoryService);
    expect(service).toBeTruthy();
  });
});
