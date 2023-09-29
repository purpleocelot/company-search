import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SiteAddUpdateComponent } from "./site-add-update.component";

describe("SiteAddUpdateComponent", () => {
  let component: SiteAddUpdateComponent;
  let fixture: ComponentFixture<SiteAddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteAddUpdateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
