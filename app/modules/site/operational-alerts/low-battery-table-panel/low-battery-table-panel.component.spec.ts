import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LowBatteryTablePanelComponent } from "./low-battery-table-panel.component";

describe("LowBatteryTablePanelComponent", () => {
  let component: LowBatteryTablePanelComponent;
  let fixture: ComponentFixture<LowBatteryTablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LowBatteryTablePanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowBatteryTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
