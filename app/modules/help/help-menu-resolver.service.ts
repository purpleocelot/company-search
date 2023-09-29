import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { HelpService } from "src/app/core/services/help/help.service";
import { SidebarMenuItems } from "src/app/core/interfaces/sidebarmenu.interface";

@Injectable()
export class HelpMenuResolverService
  implements Resolve<Observable<SidebarMenuItems>> {
  constructor(private helpService: HelpService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return of(this.helpService.getMenu());
  }
}
