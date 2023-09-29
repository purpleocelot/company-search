import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/services/user/user.service";
import { UserSettings } from "src/app/core/models/user-settings.model";
import { Language } from "src/app/core/models/language.model";
import { environment } from "src/environments/environment";
import { MenuService } from "src/app/core/services/menu/menu.service";
import { UICompany, companies } from "src/app/core/models/ui-company.model";
import {
  sorting,
  predicateBy
} from "src/app/shared/functions/sorting.function";
import { HelpService } from "src/app/core/services/help/help.service";

@Component({
  selector: "loxpad-app-shell",
  templateUrl: "./app-shell.component.html",
  styleUrls: ["./app-shell.component.scss"]
})
export class AppShellComponent implements OnInit {
  public userSettings: UserSettings;
  public showModuleSelector: boolean = false;
  public menuOpen: boolean;
  public languages: Array<Language> = [
    { code: "de", name: "Deutsch", orientation: "ltr" },
    { code: "en", name: "English", orientation: "ltr" },
    { code: "es", name: "Español", orientation: "ltr" },
    { code: "fr", name: "Francais", orientation: "ltr" },
    { code: "nl", name: "Nederlands", orientation: "ltr" },
    { code: "pl", name: "Polskie", orientation: "ltr" },
    { code: "it", name: "Italiano", orientation: "ltr" }
  ].sort(predicateBy("name"));

  public enableCompanyChange: boolean;
  public companies: Array<UICompany> = companies;

  constructor(
    private router: Router,
    private userService: UserService,
    private menuService: MenuService,
    private helpService: HelpService
  ) {}

  ngOnInit() {
    this.enableCompanyChange = environment.config.enableCompanyChange;
    this.menuOpen = this.menuService.getMenuState();

    this.menuService.menuStateEvent.subscribe(newMenuState => {
      this.menuOpen = newMenuState;
    });

    this.userService.userSettingsChanged.subscribe(
      (newUserSettings: UserSettings) => {
        this.userSettings = newUserSettings;
      }
    );

    this.userSettings = this.userService.userSettings;

    // get help content and store it in localStorage for use later
    // temporary bugfix #2185
    this.helpService.getHelpContent();

    if (this.router.url === "/") {
      this.router.navigate(["site"]);
    }
  }

  public closeModuleSelector() {
    this.showModuleSelector = false;
  }

  public logout(): void {
    this.userService.clearToken();
    this.router.navigate(["login"]);
  }

  public userName(): string {
    return this.userService.token ? this.userService.token.userName : "";
  }

  public selectLanguage(language: Language) {
    localStorage.setItem("lang", language.code);
    this.userService.setLanguage(language);
  }

  public isSelectedLanguage(language: Language): boolean {
    if (!this.userSettings || !this.userSettings.selectedLanguage) {
      if (language.code === environment.defaultLanguage) return true;
      else return false;
    }
    return this.userSettings.selectedLanguage.code == language.code;
  }

  public openMenu() {
    this.menuOpen = true;
    this.menuService.changeMenuState(true);
  }

  public goTo(location: string) {
    this.router.navigate([location]);
  }

  public selectCompany(company: UICompany) {
    this.userService.setCompany(company);
  }

  public isSelectedCompany(company: UICompany): boolean {
    return (
      this.userSettings &&
      this.userSettings.selectedUICompany &&
      this.userSettings.selectedUICompany.companyName === company.companyName
    );
  }
}
