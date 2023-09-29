import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { TranslateModule } from "@ngx-translate/core";
import { ModuleHomeComponent } from "../components/module-home/module-home.component";
import { SiteStatisticsComponent } from "./components/site-statistics/site-statistics.component";
import { PasswordComponent } from "./components/password/password.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { ReplaceZeroWithDashPipe } from "./pipes/zero-value/replace-zero-with-dash.pipe";
import { FormErrorComponent } from "./components/form-error/form-error.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MapComponent } from "../components/map/map.component";
import { AgmCoreModule } from "@agm/core";
import { environment } from "src/environments/environment";
import { KendoUiModule } from "./kendo-ui.module";
import { AlertPanelComponent } from "./components/alert-panel/alert-panel.component";
import { FooterComponent } from "../components/footer/footer.component";
import { MinutesToHoursAndMinutesPipe } from "./pipes/minutes-to-hours-and-minutes/minutes-to-hours-and-minutes.pipe";
import { UnknownDatePipe } from "./pipes/unkown-date/unknown-date.pipe";
import { UtilisationChartComponent } from "./components/utilisation-chart/utilisation-chart.component";
import { LastSyncDatetimeComponent } from "./components/last-sync-datetime/last-sync-datetime.component";
import { PageControlComponent } from "./components/page-control/page-control.component";
import { StaticChartComponent } from "./components/static-chart/static-chart.component";
import { NoDataCardComponent } from "./components/no-data-card/no-data-card.component";
import { HeaderWithFilterComponent } from "./components/header-with-filter/header-with-filter.component";
import { LocationSelectComponent } from "./components/location-select/location-select.component";
import { LoxamDatePipe } from "./pipes/date/loxam-date.pipe";

const SHARED_MODULES = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  RouterModule,
  FormsModule,
  KendoUiModule
];

const REUSABLE_COMPONENTS = [
  ModuleHomeComponent,
  SiteStatisticsComponent,
  PasswordComponent,
  DialogComponent,
  FormErrorComponent,
  ToolbarComponent,
  AlertPanelComponent,
  ReplaceZeroWithDashPipe,
  UnknownDatePipe,
  LoxamDatePipe,
  MapComponent,
  FooterComponent,
  MinutesToHoursAndMinutesPipe,
  UtilisationChartComponent,
  StaticChartComponent,
  PageControlComponent,
  LastSyncDatetimeComponent,
  NoDataCardComponent,
  HeaderWithFilterComponent,
  LocationSelectComponent
];

@NgModule({
  declarations: [...REUSABLE_COMPONENTS],
  imports: [
    SHARED_MODULES,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ],
  exports: [SHARED_MODULES, ...REUSABLE_COMPONENTS],
  entryComponents: [DialogComponent]
})
export class SharedModule {}
