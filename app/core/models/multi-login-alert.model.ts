export interface MultiLoginAlerts {
  eventDate: Date;
  operationalMultiLogins: Array<OperationalMultiLoginAlert>;
}

export interface OperationalMultiLoginAlert {
  countOfMachineMultipleLogins: number;
  eventDate: Date;
  operatorKey: number;
  operatorName: string;
}
