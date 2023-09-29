import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { SafetyAlertsComponent } from "./safety-alerts/safety-alerts.component";
import { OperationalAlertsComponent } from "./operational-alerts/operational-alerts.component";
import { UnsecuredMewpAlertsComponent } from "./unsecured-mewp-alerts/unsecured-mewp-alerts.component";
import { SiteRoutingModule } from "./site-routing.module";
import { SingleSiteSummaryResolverService } from "src/app/core/services/site-summary/single-site-summary-resolver.service";
import { SiteDashboardComponent } from "./site-dashboard/site-dashboard.component";
import { AllSitesDashboardComponent } from "./all-sites-dashboard/all-sites-dashboard.component";
import { AllSiteSummaryResolverService } from "src/app/core/services/site-summary/all-site-summary-resolver.service";
import { SingleSiteMachineLocationResolverService } from "src/app/core/services/location/single-site-machine-location-resolver.service";
import { AllSitesMachineLocationResolverService } from "src/app/core/services/location/all-sites-machine-location-resolver.service";
import { MachineInventoryComponent } from "./machine-inventory/machine-inventory.component";
import { MachineOperationsComponent } from "./machine-operations/machine-operations.component";
import { OperatorActivityComponent } from "./operator-activity/operator-activity.component";
import { SiteUtilisationComponent } from "./site-utilisation/site-utilisation.component";
import { SiteOverviewComponent } from "./site-overview/site-overview.component";
import { MachineAlertSummaryResolverService } from "src/app/core/services/machine-detail/machine-alert-summary-resolver.service";
import { BoomMachinesInventoryResolverService } from "src/app/core/services/machines-inventory/boom-inventory-resolver.service";
import { ScissorMachinesInventoryResolverService } from "src/app/core/services/machines-inventory/scissor-inventory-resolver.service";
import { OtherMachinesInventoryResolverService } from "src/app/core/services/machines-inventory/other-inventory-resolver.service";
import { UntrackedMachinesInventoryResolverService } from "src/app/core/services/machines-inventory/untracked-inventory-resolver.service";
import { MachineDetailComponent } from "./machine-detail/machine-detail.component";
import { MachineSummaryResolverService } from "src/app/core/services/machine-detail/machine-summary-resolver.service";
import { MachineUsageResolverService } from "src/app/core/services/machine-detail/machine-usage-resolver.service";
import { MachineUtilisationResolverService } from "src/app/core/services/machine-detail/machine-utilisation-resolver.service";
import { MachineDetailPanelComponent } from "./machine-detail/machine-detail-panel/machine-detail-panel.component";
import { MachineUsagePanelComponent } from "./machine-detail/machine-usage-panel/machine-usage-panel.component";
import { OperatorUsagePanelComponent } from "./operator-detail/operator-usage-panel/operator-usage-panel.component";
import { OperatorDetailComponent } from "./operator-detail/operator-detail.component";
import { OperatorSummaryResolverService } from "src/app/core/services/operator-detail/operator-summary-resolver.service";
import { OperatorDetailPanelComponent } from "./operator-detail/operator-detail-panel/operator-detail-panel.component";
import { OperatorActivityResolverService } from "src/app/core/services/operator-activity/operator-activity-resolver.service";
import { MachineOperationsDetailsPanelComponent } from "./machine-operations/machine-operations-details-panel/machine-operations-details-panel.component";
import { MachineOperationsResolverService } from "src/app/core/services/machine-operations/machine-operations-resolver.service";
import { AllMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/all-resolver.service";
import { OtherMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/other-resolver.service";
import { BoomMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/boom-resolver.service";
import { ScissorMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/scissor-resolver.service";
import { OperationalAlertsMultiLoginChartResolverService } from "src/app/core/services/operational-alerts/multi-login-chart-resolver.service";
import { OperationalAlertsLowBatteryChartResolverService } from "src/app/core/services/operational-alerts/low-battery-chart-resolver.service";
import { OperationalAlertsLowBatteryResolverService } from "src/app/core/services/operational-alerts/low-battery-resolver.service";
import { OperationalAlertsMultiLoginResolverService } from "src/app/core/services/operational-alerts/multi-login-resolver.service";
import { LowBatteryTablePanelComponent } from "./operational-alerts/low-battery-table-panel/low-battery-table-panel.component";
import { MultiLoginTablePanelComponent } from "./operational-alerts/multi-login-table-panel/multi-login-table-panel.component";
import { OperationalAlertsUnsecuredMewpChartResolverService } from "src/app/core/services/unsecured-mewps/unsecured-mewp-chart-resolver.service";
import { OperationalAlertsUnsecuredMewpResolverService } from "src/app/core/services/unsecured-mewps/unsecured-mewp-resolver.service";
import { UnsecuredMewpTablePanelComponent } from "./unsecured-mewp-alerts/unsecured-mewp-table-panel/unsecured-mewp-table-panel.component";
import { SafetyAlertTablePanelComponent } from "./safety-alerts/safety-alerts-table-panel/safety-alert-table-panel.component";
import { OperationalAlertsSafetyResolverService } from "src/app/core/services/safety-alerts/safety-alert-resolver.service";
import { OperationalAlertsSafetyChartResolverService } from "src/app/core/services/safety-alerts/safety-alert-chart-resolver.service";
import { HasMultipleSitesResolverService } from "src/app/core/services/has-multiple-sites/has-multiple-sites.resolver.service";

@NgModule({
  declarations: [
    SafetyAlertsComponent,
    OperationalAlertsComponent,
    UnsecuredMewpAlertsComponent,
    SiteDashboardComponent,
    AllSitesDashboardComponent,
    MachineInventoryComponent,
    MachineOperationsComponent,
    OperatorActivityComponent,
    SiteUtilisationComponent,
    SiteOverviewComponent,
    MachineDetailComponent,
    MachineDetailPanelComponent,
    MachineUsagePanelComponent,
    OperatorDetailComponent,
    OperatorUsagePanelComponent,
    OperatorDetailPanelComponent,
    MachineOperationsDetailsPanelComponent,
    LowBatteryTablePanelComponent,
    MultiLoginTablePanelComponent,
    UnsecuredMewpAlertsComponent,
    UnsecuredMewpTablePanelComponent,
    SafetyAlertsComponent,
    SafetyAlertTablePanelComponent
  ],
  imports: [CommonModule, SiteRoutingModule, SharedModule],
  providers: [
    SingleSiteSummaryResolverService,
    AllSiteSummaryResolverService,
    SingleSiteMachineLocationResolverService,
    AllSitesMachineLocationResolverService,
    BoomMachinesInventoryResolverService,
    ScissorMachinesInventoryResolverService,
    OtherMachinesInventoryResolverService,
    UntrackedMachinesInventoryResolverService,
    MachineAlertSummaryResolverService,
    MachineSummaryResolverService,
    MachineUsageResolverService,
    MachineUtilisationResolverService,
    OperatorSummaryResolverService,
    OperatorActivityResolverService,
    MachineOperationsResolverService,
    AllMachineUtilisationResolverService,
    OtherMachineUtilisationResolverService,
    BoomMachineUtilisationResolverService,
    ScissorMachineUtilisationResolverService,
    OperationalAlertsLowBatteryChartResolverService,
    OperationalAlertsMultiLoginChartResolverService,
    OperationalAlertsLowBatteryResolverService,
    OperationalAlertsMultiLoginResolverService,
    OperationalAlertsUnsecuredMewpChartResolverService,
    OperationalAlertsUnsecuredMewpResolverService,
    OperationalAlertsSafetyResolverService,
    OperationalAlertsSafetyChartResolverService,
    HasMultipleSitesResolverService
  ]
})
export class SiteModule {}
