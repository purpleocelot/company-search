export interface SafetyAlerts {
  eventDate: Date;
  safetyDetails: Array<OperationalSafetyAlert>;
}

export interface OperationalSafetyAlert {
  siteKey: number;
  machineKey: number;
  latitude: string;
  longitude: string;
  operatorKey: number | null;
  operatorName: string;
  accountName: string;
  itemDescription: string;
  eventDateTime: Date;
  eCode: string;
}
