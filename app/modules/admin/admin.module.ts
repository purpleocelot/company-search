import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { AdminRoutingModule } from "./admin-routing.module";
import { SitesComponent } from "./sites/sites.component";
import { AllSitesMapComponent } from "./all-sites-map/all-sites-map.component";
import { AllSitesMachineLocationResolverService } from "src/app/core/services/location/all-sites-machine-location-resolver.service";
import { UsersComponent } from "./users/users.component";
import { UsageHistoryComponent } from "./usage-history/usage-history.component";
import { AdminUserResolverService } from "src/app/core/services/user-admin/admin-user-resolver.service";
import { UserListComponent } from "./users/user-list/user-list.component";
import { UserAddUpdateComponent } from "./users/user-add-update/user-add-update.component";
import { AdminSiteListResolverService } from "src/app/core/services/user-admin/admin-site-list-resolver.service";
import { SiteListComponent } from "./sites/site-list/site-list.component";
import { SiteAddUpdateComponent } from "./sites/site-add-update/site-add-update.component";
import { MachineModalComponent } from "./sites/site-add-update/machine-modal/machine-modal.component";
import { TargaDevicesComponent } from "./targa-devices/targa-devices.component";
import { TargaDevicesResolverService } from "src/app/core/services/targa-devices/targa-devices-resolver.service";
import { UsageHistorySummaryPanelComponent } from "./usage-history/usage-history-summary-panel/usage-history-summary-panel.component";
import { UsageHistoryDetailPanelComponent } from "./usage-history/usage-history-detail-panel/usage-history-detail-panel.component";
import { UsageHistoryResolverService } from "src/app/core/services/usage-history/usage-history-resolver.service";
import { AdminSiteResolverService } from "src/app/core/services/site-admin/admin-site-resolver.service";

@NgModule({
  declarations: [
    SitesComponent,
    AllSitesMapComponent,
    UsersComponent,
    UsageHistoryComponent,
    UserListComponent,
    UserAddUpdateComponent,
    SiteListComponent,
    SiteAddUpdateComponent,
    MachineModalComponent,
    TargaDevicesComponent,
    UsageHistorySummaryPanelComponent,
    UsageHistoryDetailPanelComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  providers: [
    AllSitesMachineLocationResolverService,
    AdminUserResolverService,
    AdminSiteListResolverService,
    AdminSiteResolverService,
    TargaDevicesResolverService,
    UsageHistoryResolverService
  ],
  entryComponents: [MachineModalComponent]
})
export class AdminModule {}
