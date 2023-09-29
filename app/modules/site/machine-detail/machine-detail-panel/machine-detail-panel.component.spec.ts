import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MachineDetailPanelComponent } from "./machine-detail-panel.component";

describe("DetailPanelComponent", () => {
  let component: MachineDetailPanelComponent;
  let fixture: ComponentFixture<MachineDetailPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MachineDetailPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
