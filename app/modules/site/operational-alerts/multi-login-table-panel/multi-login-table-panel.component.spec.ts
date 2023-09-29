import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MultiLoginTablePanelComponent } from "./multi-login-table-panel.component";

describe("MultiLoginTablePanelComponent", () => {
  let component: MultiLoginTablePanelComponent;
  let fixture: ComponentFixture<MultiLoginTablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiLoginTablePanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLoginTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
