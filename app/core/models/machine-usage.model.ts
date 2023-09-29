export interface DailyUsageRecord {
  date: Date;
  events: Array<MachineUsageEvent>;
}

export interface MachineUsageEvent {
  accountName: string;
  endEventDateTime: Date;
  minutesDiff: number;
  operatorKey: number;
  operatorName: string;
  startEventDateTime: Date;
}
