export interface UnsecuredMewpAlerts {
  eventDate: Date;
  unsecuredDetails: Array<OperationalUnsecuredMewpAlert>;
}

export interface OperationalUnsecuredMewpAlert {
  accountName: string;
  ecode: string;
  eventDateTime: Date;
  itemDescription: string;
  latitude: string;
  longitude: string;
  machineKey: number;
  operatorKey: number;
  operatorName: string;
}
