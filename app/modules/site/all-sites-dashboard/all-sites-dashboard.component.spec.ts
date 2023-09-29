import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AllSitesDashboardComponent } from "./all-sites-dashboard.component";

describe("AllSitesDashboardComponent", () => {
  let component: AllSitesDashboardComponent;
  let fixture: ComponentFixture<AllSitesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllSitesDashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSitesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
