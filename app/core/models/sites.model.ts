import { IWorkingHours } from "./time.model";

export interface Site {
  associatedURL: string;
  isActive: boolean;
  loadDate: Date;
  siteDefaultLatitude: number;
  siteDefaultLongitude: number;
  siteEndDayTime: Date;
  siteId: number;
  siteKey: number;
  siteMachineMaxHours: number;
  siteMachineMinHours: number;
  siteName: string;
  siteOperatingHours: Array<IWorkingHours>;
  siteOperatorMaxHours: string;
  siteOperatorMinHours: string;
  siteStartDayTime: Date;
  siteTimeZone: string;
}

export class NewSite implements Site {
  associatedURL: string;
  isActive: boolean;
  loadDate: Date;
  siteDefaultLatitude: number;
  siteDefaultLongitude: number;
  siteEndDayTime: Date;
  siteId: number;
  siteKey: number;
  siteMachineMaxHours: number;
  siteMachineMinHours: number;
  siteName: string;
  siteOperatingHours: any;
  siteOperatorMaxHours: string;
  siteOperatorMinHours: string;
  siteStartDayTime: Date;
  siteTimeZone: string;
}

export interface ISiteDefinition {
  accountGroup: string;
  accountNumber: string;
  countryCode: string;
  definitionKey: number;
  postCode: string;
  projectCode: string;
  projectGroup: string;
  siteKey: number;
}

export const newSiteDefinition: ISiteDefinition = {
  definitionKey: null,
  siteKey: null,
  accountGroup: null,
  accountNumber: null,
  projectCode: null,
  countryCode: null,
  projectGroup: null,
  postCode: null
};

export interface IMatchedMachine {
  ecode: string;
  itemCategory: string;
  itemDescription: string;
  itemPower: string;
}
