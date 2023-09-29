import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UserService } from "../services/user/user.service";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.userService.token
      ? this.userService.token.accessToken
      : null;

    if (!authToken) {
      this.userService.clearToken();
      return next.handle(request);
    }
    // redirect to login if token has expired
    if (this.userService.hasTokenExpired()) {
      if (!this.bypassRedirect()) this.router.navigate(["login"]);
    }

    const authReq = request.clone({
      headers: request.headers.set("Authorization", `Bearer ${authToken}`)
    });

    this.userService.setExpiryTime();

    return next.handle(authReq).pipe(
      // pass through successful responses
      map((event: HttpEvent<any>) => {
        return event;
      }),
      // catch all errors
      catchError((error: HttpErrorResponse) => {
        // 401 - unauthorized
        const UNAUTHORISED_ERROR_CODE: number = 401;

        if (error.status === UNAUTHORISED_ERROR_CODE) {
          if (this.bypassRedirect()) return throwError(error.statusText);

          this.router.navigate(["unauthorised"], {
            queryParams: { reason: UNAUTHORISED_ERROR_CODE }
          });
        }

        return throwError(error.statusText);
      })
    );
  }

  private bypassRedirect(): boolean {
    const unauthorisedUrl = `/unauthorised`;
    const loginUrl = "/login";
    const forgotPassUrl = "/forgot-password";
    const resetPassUrl = "/reset-password";
    const setPassUrl = "/set-password";
    const baseUrl = "/";

    return (
      this.router.url.includes(unauthorisedUrl) ||
      this.router.url.includes(loginUrl) ||
      this.router.url.includes(forgotPassUrl) ||
      this.router.url.includes(resetPassUrl) ||
      this.router.url.includes(setPassUrl) ||
      this.router.url === baseUrl
    );
  }
}
