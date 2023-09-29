import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AllSitesMapComponent } from "./all-sites-map.component";

describe("AllSitesMapComponent", () => {
  let component: AllSitesMapComponent;
  let fixture: ComponentFixture<AllSitesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllSitesMapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSitesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
