export const environment = {
  name: "prod",
  production: true,
  config: {
    useSessionStorage: true,
    zoomOverrideLevel: 15,
    defaultAmountOfDaysHistoryToShow: 7,
    maxLoadingTimespanInMilliseconds: 30000,
    pollingInterval: 5000,
    enableCompanyChange: false
  },
  debug: {
    routeTracing: false
  },
  defaultLanguage: "en",
  isIE11: (<any>window)["loxam"].isIE11,
  pageSize: 20,
  baseURL: "https://neu-api-prod-iot.azurewebsites.net/",
  apiNamespace: "api/",
  googleMapsApiKey: "AIzaSyDXXMpGz4SWnvPpGo4O7re4m0lVsGPSYMw"
};
