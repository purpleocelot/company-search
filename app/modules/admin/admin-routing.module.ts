import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ModuleHomeComponent } from "src/app/components/module-home/module-home.component";
import { SidebarMenuItems } from "src/app/core/interfaces/sidebarmenu.interface";
import { SitesComponent } from "./sites/sites.component";
import { AllSitesMapComponent } from "./all-sites-map/all-sites-map.component";
import { AllSitesMachineLocationResolverService } from "src/app/core/services/location/all-sites-machine-location-resolver.service";
import { UsersComponent } from "./users/users.component";
import { UsageHistoryComponent } from "./usage-history/usage-history.component";
import { AdminUserResolverService } from "src/app/core/services/user-admin/admin-user-resolver.service";
import { AdminSiteListResolverService } from "src/app/core/services/user-admin/admin-site-list-resolver.service";
import { TargaDevicesComponent } from "./targa-devices/targa-devices.component";
import { TargaDevicesResolverService } from "src/app/core/services/targa-devices/targa-devices-resolver.service";
import { UsageHistoryResolverService } from "src/app/core/services/usage-history/usage-history-resolver.service";
import { AdminSiteResolverService } from "src/app/core/services/site-admin/admin-site-resolver.service";

const menuItems: SidebarMenuItems = {
  title: "Administration",
  sections: [
    {
      title: "Administration",
      items: [
        {
          title: "Sites",
          route: "sites"
        },
        {
          title: "Users",
          route: "users"
        },
        {
          title: "Usage History",
          route: "usage-history"
        },
        {
          title: "Targa Devices",
          route: "targa-devices"
        },
        {
          title: "All Sites Map",
          route: "all-sites-map"
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
      menuItems: menuItems
    },
    children: [
      {
        path: "all-sites-map",
        component: AllSitesMapComponent,
        resolve: {
          machineLocations: AllSitesMachineLocationResolverService
        }
      },
      {
        path: "sites",
        component: SitesComponent,
        resolve: {
          sites: AdminSiteResolverService
        }
      },
      {
        path: "users",
        component: UsersComponent,
        resolve: {
          users: AdminUserResolverService,
          sites: AdminSiteListResolverService
        }
      },
      {
        path: "users/:id",
        redirectTo: "users"
      },
      {
        path: "usage-history",
        component: UsageHistoryComponent,
        resolve: { usage: UsageHistoryResolverService }
      },
      {
        path: "targa-devices",
        component: TargaDevicesComponent,
        resolve: { locations: TargaDevicesResolverService }
      },
      {
        path: "**",
        redirectTo: "sites"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
