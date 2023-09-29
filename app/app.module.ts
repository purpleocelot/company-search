import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { ModuleSelectorComponent } from "./components/module-selector/module-selector.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { UnauthorisedComponent } from "./components/unauthorised/unauthorised.component";
import { AppShellComponent } from "./components/app-shell/app-shell.component";
import { UserModule } from "./shared/user.module";
import { ApiErrorComponent } from "./components/api-error/api-error.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginComponent } from "./components/login/login.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { ChartsModule } from "@progress/kendo-angular-charts";

import "hammerjs";
import { PollingService } from "./core/services/polling/polling.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    AppComponent,
    ModuleSelectorComponent,
    PageNotFoundComponent,
    UnauthorisedComponent,
    ApiErrorComponent,
    AppShellComponent,
    LoginComponent,
    LoaderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule, // todo: forRoot() to ensure singleton services
    SharedModule,
    UserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ChartsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private pollingService: PollingService) {
    pollingService.initialise();
  }
}
