import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UsageHistoryDetailPanelComponent } from "./usage-history-detail-panel.component";

describe("UsageHistoryDetailPanelComponent", () => {
  let component: UsageHistoryDetailPanelComponent;
  let fixture: ComponentFixture<UsageHistoryDetailPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsageHistoryDetailPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageHistoryDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
