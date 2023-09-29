import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { UnauthorisedComponent } from "./components/unauthorised/unauthorised.component";
import { AppShellComponent } from "./components/app-shell/app-shell.component";
import { AuthenticatedGuard } from "./core/guards/authenticated.guard";
import { AdminGuard } from "./core/guards/admin.guard";
import { ApiErrorComponent } from "./components/api-error/api-error.component";
import { LoginComponent } from "./components/login/login.component";
import { environment } from "src/environments/environment";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const ROUTES: Routes = [
  {
    path: "",
    component: AppShellComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "admin",
        loadChildren: "./modules/admin/admin.module#AdminModule",
        canActivate: [AuthenticatedGuard, AdminGuard]
      },
      {
        path: "site",
        loadChildren: "./modules/site/site.module#SiteModule",
        canActivateChild: [AuthenticatedGuard]
      },
      {
        path: "account",
        loadChildren: "./modules/account/account.module#AccountModule",
        canActivateChild: [AuthenticatedGuard]
      },
      {
        path: "help",
        loadChildren: "./modules/help/help.module#HelpModule",
        canActivateChild: [AuthenticatedGuard]
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent
  },
  {
    path: "set-password",
    component: ResetPasswordComponent
  },
  {
    path: "unauthorised",
    component: UnauthorisedComponent
  },
  {
    path: "api-error",
    component: ApiErrorComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      enableTracing: environment.debug.routeTracing
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
