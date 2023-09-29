import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UsageHistorySummaryPanelComponent } from "./usage-history-summary-panel.component";

describe("UsageHistorySummaryPanelComponent", () => {
  let component: UsageHistorySummaryPanelComponent;
  let fixture: ComponentFixture<UsageHistorySummaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsageHistorySummaryPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageHistorySummaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
