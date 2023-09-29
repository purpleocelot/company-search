import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafetyAlertTablePanelComponent } from "./safety-alert-table-panel.component";

describe("SafetyAlertTablePanelComponent", () => {
  let component: SafetyAlertTablePanelComponent;
  let fixture: ComponentFixture<SafetyAlertTablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafetyAlertTablePanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyAlertTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
