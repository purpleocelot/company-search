import { Injectable, EventEmitter } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { QueueJSEvent } from "../../decorators/queue-js-event.decorator";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  public menuStateEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  private menuOpen: boolean;

  constructor() {}

  getMenuState(): boolean {
    return this.menuOpen;
  }

  @QueueJSEvent()
  changeMenuState(value: boolean) {
    this.menuOpen = value;
    this.menuStateEvent.emit(this.menuOpen);
  }
}
