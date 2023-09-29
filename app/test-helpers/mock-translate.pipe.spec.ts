import { PipeTransform, Pipe } from "@angular/core";

/**
 * Mock for the Translate Pipe which is provided by the ngx-translate package.
 * Include this in your declarations array.
 * 
 * Example Usage:
```
   TestBed.configureTestingModule({
     declarations: [UnauthorisedComponent, MockTranslatePipe],
   // ...
   })
```
 */
@Pipe({
  name: "translate"
})
export class MockTranslatePipe implements PipeTransform {
  public name: string = "translate";

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}
