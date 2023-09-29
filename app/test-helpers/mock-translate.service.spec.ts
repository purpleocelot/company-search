import { of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

/**
 * Mock for the Translate Service which is provided by the ngx-translate package.
 * Include this in your providers array.
 * 
 * Example Usage:
```
    TestBed.configureTestingModule({
      // ...
      providers: [MockTranslateService]
    })
```
 */
class TranslateServiceStub {
  public get(key: any): any {
    of(key);
  }

  public use(key: any): any {
    of(key);
  }

  public setDefaultLang(key: any): any {
    of(key);
  }
}

export const MockTranslateService = {
  provide: TranslateService,
  useClass: TranslateServiceStub
};
