export interface OperatorSummary {
  companyName: string;
  lastMewpUsed: string;
  lastMewpUsedECode: string;
  lastMewpUsedMachineKey?: number;
  mostRecentLogin: string;
  operatorKey: number;
  operatorName: string;
  operatorSiteAlertSummaries: Array<AlertSummary>;
  usage: number;
  usages: Array<OperatorUsageEvent>;
  multiLoginCount?: number;
  skySirenAlertCount?: number;
  unsecuredMachineCount?: number;
}

export interface AlertSummary {
  eventDate: Date;
  multiLoginCount: number;
  skySirenAlertCount: number;
  unsecuredMachineCount: number;
}

export interface OperatorUsageEvent {
  eventDate: Date;
  events: Array<MachineEvent>;
  usage: number;
}

export interface MachineEvent {
  accountName: string;
  eCode: string;
  endEventDateTime: Date;
  machineKey: number;
  machineName: string;
  minutesDiff: number;
  startEventDateTime: Date;
}
