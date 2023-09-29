import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../services/user/user.service";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.startsWith("https://maps.googleapis.com")) {
      const authReq = request.clone({
        headers: request.headers
          .set("X-Frame-Options", "DENY")
          .set("Content-Security-Policy", "frame-ancestors 'none';")
          .set("X-XSS-Protection", "1; mode=block")
          .set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
          )
          .set("X-Content-Type-Options", "nosniff")
      });

      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
