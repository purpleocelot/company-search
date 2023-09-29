import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "loxpad-module-selector",
  templateUrl: "./module-selector.component.html",
  styleUrls: ["./module-selector.component.scss"]
})
export class ModuleSelectorComponent implements OnInit {
  @Output() itemClicked = new EventEmitter<boolean>();
  public cols: number;

  public moduleLinks: Array<ModuleLink> = [
    {
      title: "Procurement",
      routeLink: "/procurement"
    },
    {
      title: "Engineering",
      routeLink: "/engineering"
    },
    {
      title: "Item Ledger",
      routeLink: "/item-ledger"
    },
    {
      title: "System Utilities",
      routeLink: "/system-utilities"
    },
    {
      title: "Transport",
      routeLink: "/transport"
    },
    {
      title: "Mobile",
      routeLink: "/mobile"
    },
    {
      title: "Operations",
      routeLink: "/operations"
    },
    {
      title: "Settings",
      routeLink: "/settings"
    }
  ];
  constructor() {}

  ngOnInit() {
    this.calculateColumns(window);
  }

  onResize(event) {
    this.calculateColumns(event.target);
  }

  calculateColumns(object: any): any {
    if (object.innerWidth >= 1100) {
      this.cols = 4;
      return;
    }
    if (object.innerWidth >= 600) {
      this.cols = 3;
      return;
    }
    this.cols = 2;
  }

  public itemClickedEvent() {
    this.itemClicked.emit(true);
  }
}

interface ModuleLink {
  title: string;
  routeLink?: string;
}
