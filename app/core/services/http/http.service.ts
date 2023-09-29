import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CoreModule } from "../../core.module";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: CoreModule
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.constructURL(url));
  }

  public post<T>(
    url: string,
    data: any,
    additionalHeaders?: HttpHeaders
  ): Observable<T> {
    const headers = this.getHeaders(additionalHeaders);
    return this.httpClient.post<T>(this.constructURL(url), data, {
      headers: headers
    });
  }

  public postCredentials<T>(data: any): Observable<T> {
    const headers = this.getHeaders(null);

    return this.httpClient.post<T>(this.constructTokenURL(), data, {
      headers: headers
    });
  }

  public put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(this.constructURL(url), data);
  }

  public delete<T>(url: string, data: any): Observable<T> {
    const REQUEST_METHOD = "delete";
    return this.httpClient.request<T>(REQUEST_METHOD, this.constructURL(url), {
      body: data
    });
  }

  private getHeaders(additionalHeaders: HttpHeaders): HttpHeaders {
    let result: HttpHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "cache-control": "no-cache"
    });

    if (!additionalHeaders) return result; // No additional headers, do an early exit

    for (let key in additionalHeaders.keys()) {
      if (result.has(key)) {
        // Header already exists, update its value
        result.set(key, additionalHeaders[key]);
        continue;
      }

      result.append(key, additionalHeaders[key]);
    }

    return result;
  }

  private constructURL(url: string): string {
    return encodeURI(`${environment.baseURL}${environment.apiNamespace}${url}`);
  }

  private constructTokenURL(): string {
    return encodeURI(`${environment.baseURL}Token`);
  }
}
