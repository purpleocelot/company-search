/**
 * This decorator can be applied to a method to ensure that the method
 * executes at the END of the current javascript lifecycle event.
 *
 * This can fix the following error in Angular caused by a event timing issue:
 *
 * `ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.`
 * 
 * ### Example Usage
```
import { QueueJSEvent } from "src/app/core/decorators/queue-js-event.decorator";

class SomeClass {
  public showStar: boolean = false;

  constructor () { }

  @QueueJSEvent()
  private toggleBrightStar(): void {
    this.showStar = true;
  }

}
```
 */
export function QueueJSEvent(milliseconds: number = 0) {
  return function(target, key, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function(...args) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, milliseconds);
    };

    return descriptor;
  };
}
