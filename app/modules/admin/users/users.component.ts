import { Component, OnInit } from "@angular/core";
import { predicateBy } from "src/app/shared/functions/sorting.function";
import { User } from "src/app/core/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { Site } from "src/app/core/models/sites.model";
import { PlatformLocation } from "@angular/common";
import { clone } from "src/app/shared/functions/clone.function";

@Component({
  selector: "loxam-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public users: Array<User>;
  public sites: Array<Site>;
  public selectedUser: User;
  public readonly pageTitle: string = "Users";

  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private location: PlatformLocation
  ) {
    location.onPopState(() => {
      this.userAddEditStop(this.selectedUser);
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (resolved: { users: Array<User>; sites: Array<Site> }) => {
        this.users = resolved.users.sort(predicateBy("userName"));
        this.sites = resolved.sites.sort(predicateBy("siteName"));
        this.loaderService.stopLoading("get-users");
        this.loaderService.stopLoading("get-sites");
      }
    );
  }

  public editingUser(user: User) {
    if (user.id) {
      history.pushState(null, "Edit User", `admin/users/${user.id}`);
    } else {
      history.pushState(null, "Add User", `admin/users/add`);
    }
    this.selectedUser = clone(user);
  }

  public userAddEditStop(userFromAddEdit: User) {
    if (userFromAddEdit) {
      let user: User = this.users.find(
        userInCollection => userInCollection.id === userFromAddEdit.id
      );
      let position: number = this.users.indexOf(user);
      if (position !== -1) {
        this.users = this.users.slice(position, 1);
      }
      this.users.push(userFromAddEdit);
      this.users = this.users.sort(predicateBy("userName"));
    }
    this.selectedUser = undefined;
  }
}
