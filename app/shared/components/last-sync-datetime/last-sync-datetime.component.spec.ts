import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LastSyncDatetimeComponent } from "./last-sync-datetime.component";

describe("LastSyncDatetimeComponent", () => {
  let component: LastSyncDatetimeComponent;
  let fixture: ComponentFixture<LastSyncDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastSyncDatetimeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSyncDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
