import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";

describe("HttpService", () => {
  const mockData: TestPerson[] = [
    { name: "Bob", address: "1 Bobbington Drive" },
    { name: "Geoff", address: "2 Geoffville Road" }
  ];
  const endPoint: string = "test";
  const fullUrl: string = encodeURI(`${environment.baseURL}${endPoint}`);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], //Use HttpClientTestingModule instead of actual HttpClient
      providers: [HttpService]
    });
  });

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

  it("should call http get", inject(
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      httpService.get<any>(endPoint).subscribe(response => {
        expect(response).toBeDefined();
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne(fullUrl);
      expect(req.request.method).toEqual("GET");

      req.flush({ data: mockData });
    }
  ));

  it("should call http post", inject(
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      httpService.post<any>(endPoint, mockData).subscribe(response => {
        expect(response).toBeDefined();
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne(fullUrl);
      expect(req.request.method).toEqual("POST");

      req.flush({ data: mockData });
    }
  ));

  it("should call http put", inject(
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      httpService.put<any>(endPoint, mockData).subscribe(response => {
        expect(response).toBeDefined();
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne(fullUrl);
      expect(req.request.method).toEqual("PUT");

      req.flush({ data: mockData });
    }
  ));

  it("should call http request", inject(
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      httpService.delete<any>(endPoint, mockData).subscribe(response => {
        expect(response).toBeDefined();
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne(fullUrl);
      expect(req.request.method).toEqual("DELETE");

      req.flush({ data: mockData });
    }
  ));
});

class TestPerson {
  name: string;
  address: string;
}
