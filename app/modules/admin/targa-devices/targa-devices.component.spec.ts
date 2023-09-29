import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TargaDevicesComponent } from "./targa-devices.component";

describe("TargaDevicesComponent", () => {
  let component: TargaDevicesComponent;
  let fixture: ComponentFixture<TargaDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TargaDevicesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargaDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
