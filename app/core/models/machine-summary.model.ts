export interface MachineSummary {
  accountName: string;
  blackboxRefNumber: string;
  eCode: string;
  itemCategory: string;
  itemDescription: string;
  itemPower: string;
  machineKey: number;
  latitude?: number;
  longitude?: number;
  lastAuthenticationEventDateTime?: Date;
  operatorName?: string;
  operatorKey?: number;
  hireStartDate?: Date;
  hireEndDate?: Date;
  hireStatus?: string;
  batteryStatus?: string;
  batteryLevel?: number;
  currentBatteryPercentage?: number;
  nextServiceDueDate?: Date;
}
