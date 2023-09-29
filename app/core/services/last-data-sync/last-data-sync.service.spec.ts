import { TestBed } from "@angular/core/testing";

import { LastDataSyncService } from "./last-data-sync.service";

describe("LastDataSyncService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LastDataSyncService = TestBed.get(LastDataSyncService);
    expect(service).toBeTruthy();
  });
});
