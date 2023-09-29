export const environment = {
  name: "dev",
  production: false,
  config: {
    useSessionStorage: false,
    zoomOverrideLevel: 15,
    defaultAmountOfDaysHistoryToShow: 7,
    maxLoadingTimespanInMilliseconds: 30000,
    pollingInterval: 5000,
    enableCompanyChange: true
  },
  debug: {
    routeTracing: false
  },
  defaultLanguage: "en",
  isIE11: (<any>window)["loxam"].isIE11,
  pageSize: 20,
  baseURL: "http://localhost:6094/",
  // baseURL: "https://neu-api-qa-iot.azurewebsites.net/",
  apiNamespace: "api/",
  googleMapsApiKey: "AIzaSyDXXMpGz4SWnvPpGo4O7re4m0lVsGPSYMw"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
