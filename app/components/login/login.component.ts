import { Component, OnInit } from "@angular/core";
import { Credentials } from "./login.models";
import { NgForm } from "@angular/forms";
import { HttpService } from "src/app/core/services/http/http.service";
import { Token, TokenResponse } from "src/app/core/models/token.model";
import { UserService } from "src/app/core/services/user/user.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { toUrlParamString } from "src/app/shared/functions/toUrlString.function";

@Component({
  selector: "loxam-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public credentials: Credentials = new Credentials();
  public errorMessage: string;

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  public ngOnInit(): void {}

  public onSubmit(loginForm: NgForm): void {
    this.errorMessage = ""; // Reset any server errors
    if (loginForm.invalid) return;

    this.loaderService.startLoading("login");
    const params = { grant_type: "password", ...this.credentials };

    this.httpService
      .postCredentials<TokenResponse>(toUrlParamString(params))
      .subscribe(
        (response: TokenResponse) => {
          this.loaderService.stopLoading("login");
          let token: Token = this.mapper(response);
          this.userService.setToken(token);
          this.router.navigate(["/"]);
        },
        errorResponse => {
          this.loaderService.stopLoading("Login");
          const BAD_REQUEST: number = 400;
          if (errorResponse.status === BAD_REQUEST) {
            if (
              errorResponse.error &&
              errorResponse.error.error &&
              errorResponse.error.error === "User Locked"
            ) {
              // Account locked
              this.errorMessage =
                "Your account has been locked, please contact your IT help desk";
              return;
            }

            // Wrong UN/PW
            this.errorMessage = "Your username or password were incorrect";
            return;
          }

          // Server error
          this.errorMessage = "Server error, please try again shortly";
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
