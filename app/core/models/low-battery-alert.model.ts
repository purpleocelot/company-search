export interface LowBatteryAlerts {
  eventDate: Date;
  operationalLowBatteries: Array<OperationalLowBatteryAlert>;
}

export interface OperationalLowBatteryAlert {
  siteKey: number;
  machineKey: number;
  eCode: string;
  itemDescription: string;
  accountName: string;
  batteryValue: number;
  eventDate: Date;
  maxMachineValue: number;
}
