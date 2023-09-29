import { OperatorUsageEvent } from "./operator-summary.model";

export interface MachineOperation {
  contractor: string;
  days: number;
  eCode: string;
  itemDescription: string;
  lastOperator: string;
  lastOperatorKey: number;
  lastRecordedUse: Date;
  machineKey: number;
  nextService: Date;
  onHireUntil: Date;
  usage: number;
  usages: Array<OperatorUsageEvent>;
}
