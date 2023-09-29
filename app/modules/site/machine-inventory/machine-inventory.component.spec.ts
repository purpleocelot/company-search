import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MachineInventoryComponent } from "./machine-inventory.component";

describe("MachineInventoryComponent", () => {
  let component: MachineInventoryComponent;
  let fixture: ComponentFixture<MachineInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MachineInventoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
