export interface LoadingProcess {
  key: string;
  timestamp: Date;
  maxDuration: number;
}

export class LoadingProcessItem implements LoadingProcess {
  key: string;
  timestamp: Date;
  maxDuration: number;

  constructor(key: string, timestamp: Date, maxDuration: number) {
    this.key = key;
    this.timestamp = timestamp;
    this.maxDuration = maxDuration;
  }

  public expired(): boolean {
    let threshold = new Date(Date.now() - this.maxDuration);
    return threshold > this.timestamp;
  }
}
