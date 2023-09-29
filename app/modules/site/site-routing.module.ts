import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ModuleHomeComponent } from "src/app/components/module-home/module-home.component";
import { SidebarMenuItems } from "src/app/core/interfaces/sidebarmenu.interface";
import { SafetyAlertsComponent } from "./safety-alerts/safety-alerts.component";
import { SingleSiteSummaryResolverService } from "src/app/core/services/site-summary/single-site-summary-resolver.service";
import { AllSitesDashboardComponent } from "./all-sites-dashboard/all-sites-dashboard.component";
import { SiteDashboardComponent } from "./site-dashboard/site-dashboard.component";
import { AllSiteSummaryResolverService } from "src/app/core/services/site-summary/all-site-summary-resolver.service";
import { SingleSiteMachineLocationResolverService } from "src/app/core/services/location/single-site-machine-location-resolver.service";
import { MachineInventoryComponent } from "./machine-inventory/machine-inventory.component";
import { MachineOperationsComponent } from "./machine-operations/machine-operations.component";
import { OperatorActivityComponent } from "./operator-activity/operator-activity.component";
import { SiteUtilisationComponent } from "./site-utilisation/site-utilisation.component";
import { OperationalAlertsComponent } from "./operational-alerts/operational-alerts.component";
import { UnsecuredMewpAlertsComponent } from "./unsecured-mewp-alerts/unsecured-mewp-alerts.component";
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
import { OperatorDetailComponent } from "./operator-detail/operator-detail.component";
import { OperatorSummaryResolverService } from "src/app/core/services/operator-detail/operator-summary-resolver.service";
import { OperatorActivityResolverService } from "src/app/core/services/operator-activity/operator-activity-resolver.service";
import { MachineOperationsResolverService } from "src/app/core/services/machine-operations/machine-operations-resolver.service";
import { AllMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/all-resolver.service";
import { OtherMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/other-resolver.service";
import { BoomMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/boom-resolver.service";
import { ScissorMachineUtilisationResolverService } from "src/app/core/services/site-utilisation/scissor-resolver.service";
import { OperationalAlertsLowBatteryResolverService } from "src/app/core/services/operational-alerts/low-battery-resolver.service";
import { OperationalAlertsLowBatteryChartResolverService } from "src/app/core/services/operational-alerts/low-battery-chart-resolver.service";
import { OperationalAlertsMultiLoginChartResolverService } from "src/app/core/services/operational-alerts/multi-login-chart-resolver.service";
import { OperationalAlertsMultiLoginResolverService } from "src/app/core/services/operational-alerts/multi-login-resolver.service";
import { OperationalAlertsUnsecuredMewpChartResolverService } from "src/app/core/services/unsecured-mewps/unsecured-mewp-chart-resolver.service";
import { OperationalAlertsUnsecuredMewpResolverService } from "src/app/core/services/unsecured-mewps/unsecured-mewp-resolver.service";
import { OperationalAlertsSafetyChartResolverService } from "src/app/core/services/safety-alerts/safety-alert-chart-resolver.service";
import { OperationalAlertsSafetyResolverService } from "src/app/core/services/safety-alerts/safety-alert-resolver.service";
import { HasMultipleSitesResolverService } from "src/app/core/services/has-multiple-sites/has-multiple-sites.resolver.service";

const menuItems: SidebarMenuItems = {
  title: "Dashboard",
  sections: [
    {
      title: "All Sites",
      route: "../site",
      items: [],
      ignoreSiteIdInRouterLink: true
    },
    {
      title: "Site Dashboard",
      route: "overview",
      items: []
    },
    {
      title: "Alerts",
      items: [
        {
          title: "Safety",
          route: "safety-alerts"
        },
        {
          title: "Operational",
          route: "operational-alerts"
        },
        {
          title: "Unsecured MEWPs",
          route: "unsecured-mewp-alerts"
        }
      ]
    },
    {
      title: "Operations",
      items: [
        {
          title: "Machines",
          route: "machines-inventory"
        },
        {
          title: "Operations",
          route: "machine-operations"
        },
        {
          title: "Operator Activity",
          route: "operator-activity"
        },
        {
          title: "Utilisation",
          route: "utilisation"
        }
      ]
    }
  ]
};

const routes: Routes = [
  {
    path: "",
    component: ModuleHomeComponent,
    data: {
      menuItems: menuItems,
      useSiteIdForNavigation: true
    },
    resolve: {
      hasMultipleSites: HasMultipleSitesResolverService
    },
    children: [
      {
        path: "",
        component: AllSitesDashboardComponent,
        pathMatch: "full",
        resolve: { allSiteSummary: AllSiteSummaryResolverService }
      },
      {
        path: ":siteId",
        component: SiteDashboardComponent,
        resolve: {
          siteSummary: SingleSiteSummaryResolverService,
          machineLocations: SingleSiteMachineLocationResolverService
        },
        children: [
          {
            path: "overview",
            component: SiteOverviewComponent
          },
          {
            path: "safety-alerts",
            component: SafetyAlertsComponent,
            resolve: {
              safetyAlerts: OperationalAlertsSafetyResolverService,
              safetyChart: OperationalAlertsSafetyChartResolverService
            }
          },
          {
            path: "operational-alerts",
            component: OperationalAlertsComponent,
            resolve: {
              lowBatteryAlerts: OperationalAlertsLowBatteryResolverService,
              lowBatteryChart: OperationalAlertsLowBatteryChartResolverService,
              multiLoginAlerts: OperationalAlertsMultiLoginResolverService,
              multiLoginChart: OperationalAlertsMultiLoginChartResolverService
            }
          },
          {
            path: "unsecured-mewp-alerts",
            component: UnsecuredMewpAlertsComponent,
            resolve: {
              unsecuredMewpAlerts: OperationalAlertsUnsecuredMewpResolverService,
              unsecuredMewpChart: OperationalAlertsUnsecuredMewpChartResolverService
            }
          },
          {
            path: "machines-inventory",
            component: MachineInventoryComponent,
            resolve: {
              booms: BoomMachinesInventoryResolverService,
              scissors: ScissorMachinesInventoryResolverService,
              others: OtherMachinesInventoryResolverService,
              untracked: UntrackedMachinesInventoryResolverService
            }
          },
          {
            path: "machine-operations",
            component: MachineOperationsComponent,
            resolve: {
              machineOperations: MachineOperationsResolverService
            }
          },
          {
            path: "machine-detail/:machineId",
            component: MachineDetailComponent,
            resolve: {
              alertSummary: MachineAlertSummaryResolverService,
              machineSummary: MachineSummaryResolverService,
              usage: MachineUsageResolverService,
              utilisation: MachineUtilisationResolverService
            }
          },
          {
            path: "operator-activity",
            component: OperatorActivityComponent,
            resolve: {
              operatorActivity: OperatorActivityResolverService
            }
          },
          {
            path: "operator-detail/:operatorId",
            component: OperatorDetailComponent,
            resolve: {
              operatorSummary: OperatorSummaryResolverService
            }
          },
          {
            path: "utilisation",
            component: SiteUtilisationComponent,
            resolve: {
              all: AllMachineUtilisationResolverService,
              other: OtherMachineUtilisationResolverService,
              boom: BoomMachineUtilisationResolverService,
              scissor: ScissorMachineUtilisationResolverService
            }
          }
        ]
      },

      // redirect for existing links or bookmarks
      {
        path: ":siteId/dashboard",
        redirectTo: ":siteId",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {}
