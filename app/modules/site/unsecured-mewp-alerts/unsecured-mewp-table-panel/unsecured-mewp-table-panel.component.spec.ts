import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnsecuredMewpTablePanelComponent } from "./unsecured-mewp-table-panel.component";

describe("UnsecuredMewpTablePanelComponent", () => {
  let component: UnsecuredMewpTablePanelComponent;
  let fixture: ComponentFixture<UnsecuredMewpTablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnsecuredMewpTablePanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsecuredMewpTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
