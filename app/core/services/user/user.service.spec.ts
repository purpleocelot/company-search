import { TestBed, async } from "@angular/core/testing";
import { UserService } from "./user.service";
import { MockTranslateService } from "src/app/test-helpers/mock-translate.service.spec";
import { Language } from "../../models/language.model";
import { UserSettings } from "../../models/user-settings.model";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UserService, MockTranslateService]
    }).compileComponents();

    service = TestBed.get(UserService);
  }));

  it("should create the service", () => {
    expect(service).toBeDefined();
  });

  it("should set language", () => {
    let testLanguage: Language = {
      code: "ts",
      name: "test",
      orientation: "ltr"
    };

    service.userSettingsChanged.subscribe(response => {
      expect(response).not.toBeNull();
      let result: Language = response.selectedLanguage;
      expect(result).toBe(testLanguage);
    });

    service.setLanguage(testLanguage);
  });
});
