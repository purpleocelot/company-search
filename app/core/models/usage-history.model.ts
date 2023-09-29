export interface UsageHistory {
  username: string;
  pageName: string;
  siteId?: number;
  eventDateTime: Date;
}

export class UsageHistoryItem implements UsageHistory {
  username: string;
  pageName: string;
  siteId?: number;
  eventDateTime: Date;

  constructor(username: string, pageName: string, siteId?: number) {
    this.username = username;
    this.pageName = pageName;
    this.siteId = siteId;
    this.eventDateTime = new Date();
  }
}
