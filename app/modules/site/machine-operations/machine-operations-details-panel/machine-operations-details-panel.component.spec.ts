import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MachineOperationsDetailsPanelComponent } from "./machine-operations-details-panel.component";

describe("MachineOperationsDetailsPanelComponent", () => {
  let component: MachineOperationsDetailsPanelComponent;
  let fixture: ComponentFixture<MachineOperationsDetailsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MachineOperationsDetailsPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineOperationsDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
