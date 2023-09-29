import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ModuleHomeComponent } from "src/app/components/module-home/module-home.component";
import { SidebarMenuItems } from "src/app/core/interfaces/sidebarmenu.interface";

const menuItems: SidebarMenuItems = {
  title: "Account",
  sections: [
    {
      title: "Password",
      items: [
        {
          title: "Change",
          route: "change-password"
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
        path: "change-password",
        component: ChangePasswordComponent
      },
      {
        path: "**",
        redirectTo: "change-password"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
