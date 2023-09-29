import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";
import { AccountRoutingModule } from "./account-routing.module";
import { ChangePasswordComponent } from "./change-password/change-password.component";

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule]
})
export class AccountModule {}
