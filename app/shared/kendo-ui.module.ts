import { NgModule } from "@angular/core";
import { ChartsModule } from "@progress/kendo-angular-charts";

const KENDO_COMPONENTS = [ChartsModule];

@NgModule({
  imports: [KENDO_COMPONENTS],
  exports: [KENDO_COMPONENTS]
})
export class KendoUiModule {}
