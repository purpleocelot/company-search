import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UtilisationChartComponent } from "./utilisation-chart.component";

describe("UtilisationChartComponent", () => {
  let component: UtilisationChartComponent;
  let fixture: ComponentFixture<UtilisationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisationChartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
