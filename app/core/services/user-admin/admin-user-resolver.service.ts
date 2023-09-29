import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Resolve } from "@angular/router";
import { LoaderService } from "../loader/loader.service";
import { User } from "../../models/user.model";

@Injectable()
export class AdminUserResolverService
  implements Resolve<Observable<Array<User>>> {
  constructor(
    private loaderService: LoaderService,
    private httpService: HttpService
  ) {}

  resolve() {
    this.loaderService.startLoading("get-users");
    return this.httpService.get<Array<User>>(`Account/RegisteredUsers`);
  }
}
