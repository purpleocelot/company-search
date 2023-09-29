import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { HttpService } from "src/app/core/services/http/http.service";
import { UserService } from "src/app/core/services/user/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ResetPassword } from "./reset-password.models";
import { TokenResponse, Token } from "src/app/core/models/token.model";
import { toUrlParamString } from "src/app/shared/functions/toUrlString.function";

@Component({
  selector: "loxam-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  public obscurred: boolean = true;
  public resetPassword: ResetPassword = new ResetPassword();
  public errorMessage: string = "";
  public mode: string;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.resetPassword.email = this.userService.token
      ? this.userService.token.userName
      : "";
  }

  public ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.resetPassword.email = params["email"];
      this.resetPassword.code = params["code"];
      this.mode = params["mode"];
    });
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

    this.loaderService.startLoading("reset-password");

    this.httpService
      .post("Account/ResetPassword", this.resetPassword)
      .subscribe(
        (response: any) => {
          // New password successfully created, so log in with these credentials
          this.login();
        },
        errorResponse => {
          this.loaderService.stopLoading("reset-password");
          const BAD_REQUEST: number = 400;

          this.errorMessage =
            errorResponse.error &&
            errorResponse.error.modelState[""] &&
            errorResponse.error.modelState[""].length > 0
              ? errorResponse.error.modelState[""][0]
              : errorResponse.status === BAD_REQUEST
              ? "Your reset password email has expired. Please request a new forgotten password email."
              : "Server error, please try again shortly.";
        }
      );
  }

  private validateForm(form: NgForm): boolean {
    if (!form) return false;
    if (form.invalid) return false;

    if (this.resetPassword.newPassword !== this.resetPassword.confirmPassword) {
      this.errorMessage =
        "Your new password and your confirmation password do not match.";
      return false;
    }

    return true;
  }

  private login(): void {
    const params = {
      grant_type: "password",
      username: this.resetPassword.email,
      password: this.resetPassword.newPassword
    };

    this.httpService
      .postCredentials<TokenResponse>(toUrlParamString(params))
      .subscribe(
        (response: TokenResponse) => {
          this.loaderService.stopLoading("reset-password");
          let token: Token = this.mapper(response);
          this.userService.setToken(token);
          this.router.navigate(["/"]);
        },
        error => {
          // This is highly unlikely, but still possible - the password reset was successful, but logging in wasn't.
          // An error message would give the user the impression that their password hasn't been reset, so instead dump them at the login page.
          this.loaderService.stopLoading("reset-password");
          this.router.navigate(["/login"]);
        }
      );
  }

  private mapper(responseData: TokenResponse): Token {
    return {
      accessToken: responseData.access_token,
      expiresIn: responseData.expires_in,
      isAdmin: responseData.isAdmin === "true" ? true : false,
      userName: responseData.userName
    };
  }
}
