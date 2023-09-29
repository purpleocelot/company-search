import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PageControlComponent } from "./page-control.component";

describe("PageControlComponent", () => {
  let component: PageControlComponent;
  let fixture: ComponentFixture<PageControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageControlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
