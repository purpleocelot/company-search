import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnsecuredMewpAlertsComponent } from "./unsecured-mewp-alerts.component";

describe("UnsecuredMewpAlertsComponent", () => {
  let component: UnsecuredMewpAlertsComponent;
  let fixture: ComponentFixture<UnsecuredMewpAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnsecuredMewpAlertsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsecuredMewpAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
