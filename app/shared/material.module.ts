import { NgModule } from "@angular/core";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTreeModule } from "@angular/material/tree";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule } from "@angular/material/dialog";
import {
  MatAutocompleteModule,
  MAT_AUTOCOMPLETE_DEFAULT_OPTIONS
} from "@angular/material/autocomplete";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule } from "@angular/material/chips";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CdkTableModule } from "@angular/cdk/table";

const MATERIAL_COMPONENTS = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatTooltipModule,
  MatGridListModule,
  MatTreeModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSelectModule,
  MatStepperModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatChipsModule,
  MatBadgeModule,
  MatTableModule,
  MatExpansionModule,
  MatSortModule,
  MatPaginatorModule,
  MatSliderModule,
  MatCardModule,
  MatSlideToggleModule,
  CdkTableModule
];

@NgModule({
  imports: [MATERIAL_COMPONENTS],
  exports: [MATERIAL_COMPONENTS],
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { autoActiveFirstOption: true }
    }
  ]
})
export class MaterialModule {}
