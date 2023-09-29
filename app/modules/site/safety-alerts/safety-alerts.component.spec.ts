import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafetyAlertsComponent } from "./safety-alerts.component";

describe("SafetyAlertsComponent", () => {
  let component: SafetyAlertsComponent;
  let fixture: ComponentFixture<SafetyAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafetyAlertsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
