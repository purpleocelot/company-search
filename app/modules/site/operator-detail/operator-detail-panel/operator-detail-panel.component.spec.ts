import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OperatorDetailPanelComponent } from "./operator-detail-panel.component";

describe("DetailPanelComponent", () => {
  let component: OperatorDetailPanelComponent;
  let fixture: ComponentFixture<OperatorDetailPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorDetailPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
