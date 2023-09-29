import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SiteStatisticsComponent } from "./site-statistics.component";

describe("SiteStatisticsComponent", () => {
  let component: SiteStatisticsComponent;
  let fixture: ComponentFixture<SiteStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteStatisticsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
