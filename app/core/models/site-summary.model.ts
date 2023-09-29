export interface SiteSummary {
  siteId: number;
  siteName: string;
  boomMachineCount: number;
  otherMachineCount: number;
  scissorMachineCount: number;
  siteDefaultLatitude?: number;
  siteDefaultLongitude?: number;
  totalContractorCount: number;
  totalMachineCount: number;
  totalOperatorCount: number;
  untrackedMachineCount: number;
  machineSiteAlertSummaries: Array<MachineSiteAlertSummary>;
  siteAlertSummary?: SiteAlertSummary;
}

export interface MachineSiteAlertSummary {
  eventDate: string;
  lowBatteryMachineCount: number;
  multiLoginCount: number;
  siteId: number;
  skySirenAlertCount: number;
  unsecuredMachineCount: number;
}

interface SiteAlertSummary {
  skySirenAlertCount: number;
}
