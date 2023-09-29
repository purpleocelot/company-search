export interface Location {
  eCode: string;
  itemDescription: string;
  machineKey: number;
  latitude: number;
  longitude: number;
  deviceType: string;
  siteKey: number;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export class Coordinates implements ICoordinates {
  latitude: number;
  longitude: number;

  constructor(lat: number, long: number) {
    this.latitude = lat;
    this.longitude = long;
  }
}
export class LocationItem implements Location {
  eCode: string;
  itemDescription: string;
  machineKey: number;
  latitude: number;
  longitude: number;
  deviceType: string;
  siteKey: number;

  constructor(
    eCode: string,
    itemDescription: string,
    machineKey: number,
    latitude: number,
    longitude: number,
    deviceType?: string,
    siteKey?: number
  ) {
    this.eCode = eCode;
    this.itemDescription = itemDescription;
    this.machineKey = machineKey;
    this.latitude = latitude;
    this.longitude = longitude;
    this.deviceType = deviceType;
    this.siteKey = siteKey;
  }
}
