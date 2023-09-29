import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ModuleHomeComponent } from "src/app/components/module-home/module-home.component";
import { HelpArticleComponent } from "./article/help-article.component";
import { HelpMenuResolverService } from "./help-menu-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: ModuleHomeComponent,
    resolve: {
      menuItems: HelpMenuResolverService
    },
    children: [
      {
        path: ":key",
        component: HelpArticleComponent
      },
      {
        path: "**",
        component: HelpArticleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {}
