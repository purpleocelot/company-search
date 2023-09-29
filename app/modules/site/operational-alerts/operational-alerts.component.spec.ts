import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OperationalAlertsComponent } from "./operational-alerts.component";

describe("OperationalAlertsComponent", () => {
  let component: OperationalAlertsComponent;
  let fixture: ComponentFixture<OperationalAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperationalAlertsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
