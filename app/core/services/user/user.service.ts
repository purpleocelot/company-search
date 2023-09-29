import { Injectable, EventEmitter } from "@angular/core";
import { UserModule } from "src/app/shared/user.module";
import { TranslateService } from "@ngx-translate/core";
import { UserSettings } from "../../models/user-settings.model";
import { Language } from "../../models/language.model";
import { Token } from "../../models/token.model";
import { environment } from "src/environments/environment";
import { OverlayContainer } from "@angular/cdk/overlay";
import { UICompany, companies } from "../../models/ui-company.model";
import * as moment from "moment/moment";
import { SiteSummary } from "../../models/site-summary.model";

@Injectable({
  providedIn: UserModule
})
export class UserService {
  public userSettings: UserSettings;
  public userSettingsChanged: EventEmitter<UserSettings> = new EventEmitter<
    UserSettings
  >();
  public token: Token;
  public tokenExpiresAt: Date;

  private tokenKey: string = "token";
  private tokenExpiryKey: string = "token-expiry";

  constructor(
    private translateService: TranslateService,
    private overlayContainer: OverlayContainer
  ) {
    console.log("Initialising User Service");
    this.userSettings = new UserSettings();

    this.setUICompanyFromUrl();
  }

  public setToken(newToken: Token): void {
    this.token = newToken;

    if (environment.config.useSessionStorage) {
      sessionStorage.setItem(this.tokenKey, JSON.stringify(this.token));
    } else {
      localStorage.setItem(this.tokenKey, JSON.stringify(this.token));
    }

    this.setExpiryTime();
    this.setIsAdmin();
  }

  public clearToken(): void {
    this.token = null;

    if (environment.config.useSessionStorage) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.tokenExpiryKey);
      return;
    }

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpiryKey);
  }

  public authorised(): boolean {
    this.tokenExpiresAt = environment.config.useSessionStorage
      ? new Date(JSON.parse(sessionStorage.getItem(this.tokenExpiryKey)))
      : new Date(JSON.parse(localStorage.getItem(this.tokenExpiryKey)));
    let now: Date = new Date();

    this.token = environment.config.useSessionStorage
      ? JSON.parse(sessionStorage.getItem(this.tokenKey))
      : JSON.parse(localStorage.getItem(this.tokenKey));

    this.setIsAdmin();

    // TODO: Need a way to check if the user token is valid and not a forgery
    return this.token != null && this.tokenExpiresAt >= now;
  }

  public setLanguage(language: Language): void {
    console.log(`Changing Language to ${language.name}`);
    this.userSettings.selectedLanguage = language;
    this.translateService.use(language.code);
    this.fireUserSettingsChangedEvent();

    // TODO: re-fetch help content
  }

  public setSelectedSite(siteSummary: SiteSummary): void {
    this.userSettings.selectedSite = siteSummary;
    this.userSettingsChanged.emit(this.userSettings);
  }

  public clearSelectedSite(): any {
    this.userSettings.selectedSite = undefined;
    this.userSettingsChanged.emit(this.userSettings);
  }

  public setIsAdmin(): void {
    this.userSettings.isAdmin = this.admin();
    this.userSettingsChanged.emit(this.userSettings);
  }

  public fireUserSettingsChangedEvent(): void {
    console.log("User Settings Updated");
    this.userSettingsChanged.emit(this.userSettings);
  }

  public admin(): boolean {
    return this.token ? Boolean(this.token.isAdmin) : false;
  }

  public setCompany(company: UICompany): void {
    this.userSettings.selectedUICompany = company;
    this.setTheme();
    this.setFavicon();
  }

  public getCompany(): UICompany {
    return this.userSettings.selectedUICompany;
  }

  public setExpiryTime(): any {
    if (environment.config.useSessionStorage) {
      sessionStorage.setItem(
        this.tokenExpiryKey,
        JSON.stringify(moment.now() + this.token.expiresIn)
      );
    } else {
      localStorage.setItem(
        this.tokenExpiryKey,
        JSON.stringify(moment.now() + this.token.expiresIn)
      );
    }
  }

  public hasTokenExpired(): boolean {
    const tokenExpires = environment.config.useSessionStorage
      ? Number(sessionStorage.getItem(this.tokenExpiryKey))
      : Number(localStorage.getItem(this.tokenExpiryKey));
    const now: number = Date.now();

    // if no token, return false to stop any redirects
    if (!tokenExpires || tokenExpires === 0) return false;

    return now >= tokenExpires;
  }

  private setUICompanyFromUrl(): any {
    if (window.location.origin.toLowerCase().includes("rapidaccess-gulf")) {
      this.setCompany(
        companies.find(company => company.companyName === "Rapid Access")
      );
    } else if (window.location.origin.toLowerCase().includes("loxam-access")) {
      this.setCompany(
        companies.find(company => company.companyName === "Loxam Access")
      );
    } else {
      this.setCompany(
        companies.find(
          company => company.companyName === "Nationwide Platforms"
        )
      );
    }
  }

  private setFavicon(): any {
    var favicon = document.querySelector('link[rel="shortcut icon"]');

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.setAttribute("rel", "shortcut icon");
      var head = document.querySelector("head");
      head.appendChild(favicon);
    }
    favicon.setAttribute("type", "image/png");
    favicon.setAttribute(
      "href",
      `assets/images/${this.userSettings.selectedUICompany.icon}`
    );
  }

  private setTheme(): void {
    companies.forEach(company => {
      this.overlayContainer
        .getContainerElement()
        .parentElement.classList.remove(company.theme);
    });
    this.overlayContainer
      .getContainerElement()
      .parentElement.classList.add(this.userSettings.selectedUICompany.theme);
  }
}
