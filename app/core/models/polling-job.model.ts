export interface PollingJob {
  key: string;
  interval: number;
  function: Function;
  lastExecuted?: Date;
  scope: any;
}

export class PollingJobItem implements PollingJob {
  key: string;
  interval: number;
  function: Function;
  lastExecuted?: Date;
  scope: any;

  constructor(
    key: string,
    interval: number,
    functionToExecute: Function,
    scope: any
  ) {
    this.key = key;
    this.interval = interval;
    this.function = functionToExecute;
    this.scope = scope;
  }
}
