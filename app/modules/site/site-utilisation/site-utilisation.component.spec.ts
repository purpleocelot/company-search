import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SiteUtilisationComponent } from "./site-utilisation.component";

describe("SiteUtilisationComponent", () => {
  let component: SiteUtilisationComponent;
  let fixture: ComponentFixture<SiteUtilisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteUtilisationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteUtilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
