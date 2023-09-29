import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { HttpService } from "src/app/core/services/http/http.service";
import { UserService } from "src/app/core/services/user/user.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";

@Component({
  selector: "loxam-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent {
  public email: string;
  public errorMessage: string = "";
  // Simplified email regex
  //
  // ^\s*                             - Begining of string, followed by zero or more whitespace.
  // \s*\S+                           - Email recipient's name - 1 or more non-whitespace characters
  // @
  // (\S+\.)+                         - Domain (and possible subdomains) - 1 or more non-whitespace chars followed by a dot
  // \.[a-zA-Z]{2,}                   - Top level domain - a dot, followed by 2 or more a-z characters.
  // \s*$                             - Zero or more whitespace, followed by end of string.
  public pattern: RegExp = /^\s*\S+@(\S+\.)+[a-zA-Z]{2,}\s*$/;

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) {}

  public disableSubmit(form: any): boolean {
    return form.pristine || (form.dirty && form.invalid);
  }

  public hasError(forgotForm: NgForm, errorName: string): boolean {
    const formControl = forgotForm.form.controls.email;
    if (!formControl) return false;

    return formControl.hasError(errorName);
  }

  public onSubmit(form: NgForm): void {
    this.errorMessage = ""; // Reset any server errors

    if (!form || form.invalid) return;

    this.loaderService.startLoading("forgot-password");

    const resetUrl = `${window.location.origin}/reset-password`;
    const company = this.userService.getCompany();
    const url: string =
      `Account/ForgotPassword` +
      `?url=${resetUrl}` +
      `&email=${this.email}` +
      `&from=${company.email}` +
      `&company=${company.companyName}`;

    this.httpService.post(url, null).subscribe(
      (response: any) => {
        this.loaderService.stopLoading("forgot-password");
        this.showOkDialog();
      },
      (errorResponse: any) => {
        this.loaderService.stopLoading("forgot-password");
        if (errorResponse.error.Message === "User not found") {
          this.errorMessage = "Email address is not registered.";
          return;
        }

        this.errorMessage = "Server error, please try again shortly.";
      }
    );
  }

  private showOkDialog(): void {
    const dlg = this.dialog.open(DialogComponent, {
      data: {
        title: "Success",
        message:
          "Your reset password email has been sent.<br>Please check your email and click on the link within.",
        icon: "done"
      }
    });

    dlg.afterClosed().subscribe((result: boolean) => {
      this.router.navigate(["/login"]);
    });
  }
}
