import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MachineUsagePanelComponent } from "./machine-usage-panel.component";

describe("UsagePanelComponent", () => {
  let component: MachineUsagePanelComponent;
  let fixture: ComponentFixture<MachineUsagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MachineUsagePanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineUsagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
