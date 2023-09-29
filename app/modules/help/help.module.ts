import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

import { HelpRoutingModule } from "./help-routing.module";
import { HelpArticleComponent } from "./article/help-article.component";
import { HelpMenuResolverService } from "./help-menu-resolver.service";

@NgModule({
  declarations: [HelpArticleComponent],
  imports: [CommonModule, HelpRoutingModule, SharedModule],
  providers: [HelpMenuResolverService]
})
export class HelpModule {}
