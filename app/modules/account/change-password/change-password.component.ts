import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { HttpService } from "src/app/core/services/http/http.service";
import { UserService } from "src/app/core/services/user/user.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { ChangePassword } from "./change-password.models";
import { MenuService } from "src/app/core/services/menu/menu.service";

@Component({
  selector: "loxam-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements AfterViewInit {
  public obscurred: boolean = true;
  public changePassword: ChangePassword = new ChangePassword();
  public errorMessage: string = "";

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private menuService: MenuService
  ) {
    this.changePassword.email = this.userService.token
      ? this.userService.token.userName
      : "";
  }

  ngAfterViewInit() {
    this.menuService.changeMenuState(false);
  }

  public onObscurityChanged(state: boolean): void {
    this.obscurred = state;
  }

  public disableSubmit(form: any): boolean {
    return form.pristine || (form.dirty && form.invalid);
  }

  public onSubmit(form: NgForm): void {
    this.errorMessage = ""; // Reset any server errors

    if (!this.validateForm(form)) return;

    this.loaderService.startLoading("change-password");

    this.httpService
      .post("Account/ChangePassword", this.changePassword)
      .subscribe(
        (response: any) => {
          this.loaderService.stopLoading("change-password");
          this.showOkDialog();
        },
        errorResponse => {
          this.loaderService.stopLoading("change-password");
          const BAD_REQUEST: number = 400;
          this.errorMessage =
            errorResponse.error &&
            errorResponse.error.modelState[""] &&
            errorResponse.error.modelState[""].length > 0
              ? errorResponse.error.modelState[""][0]
              : errorResponse.status === BAD_REQUEST
              ? "Your existing password was incorrect."
              : "Server error, please try again shortly.";
        }
      );
  }

  public goBack(): void {
    window.history.back();
  }

  private validateForm(form: NgForm): boolean {
    if (!form) return false;

    if (form.invalid) return false;

    if (
      this.changePassword.newPassword !== this.changePassword.confirmPassword
    ) {
      this.errorMessage =
        "Your new password and your confirmation password do not match.";
      return false;
    }

    return true;
  }

  private showOkDialog(): void {
    const dlg = this.dialog.open(DialogComponent, {
      data: {
        title: "Success",
        message: "Your password has been changed.",
        icon: "done"
      }
    });

    dlg.afterClosed().subscribe((result: boolean) => {
      this.goBack();
    });
  }
}
