import { Injectable } from "@angular/core";
import { UserDto, User } from "../../models/user.model";
import { Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { CoreModule } from "../../core.module";
import { UICompany } from "../../models/ui-company.model";

@Injectable({
  providedIn: CoreModule
})
export class AdminUserService {
  constructor(private httpService: HttpService) {}

  public saveUserPermissions(user: UserDto): Observable<User> {
    return this.httpService.post<User>("Account/SetUserPermissions", user);
  }

  public registerUser(user: UserDto, company: UICompany): Observable<User> {
    const resetUrl = `${company.url}/set-password`;
    const url: string =
      `Account/RegisterNewUser` +
      `?url=${resetUrl}` +
      `&from=${company.email}` +
      `&company=${company.companyName}`;
    return this.httpService.post<User>(url, user);
  }
}
