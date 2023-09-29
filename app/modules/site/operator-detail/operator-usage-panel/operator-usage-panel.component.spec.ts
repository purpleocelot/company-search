import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OperatorUsagePanelComponent } from "./operator-usage-panel.component";

describe("UsagePanelComponent", () => {
  let component: OperatorUsagePanelComponent;
  let fixture: ComponentFixture<OperatorUsagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorUsagePanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorUsagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
