import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../services/user/user.service";
import { environment } from "src/environments/environment";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let language: string = environment.defaultLanguage;

    if (this.userService.userSettings.selectedLanguage)
      language = this.userService.userSettings.selectedLanguage.code;

    const languageRequestHeader = request.clone({
      headers: request.headers.set("Accept-Language", language)
    });
    return next.handle(languageRequestHeader);
  }
}
