import { environment } from "src/environments/environment";
export interface UICompany {
  companyName: "Nationwide Platforms" | "Loxam Access" | "Rapid Access";
  friendlyName: string;
  url: string;
  theme: string;
  icon: string;
  chartSettings: ChartSettings;
  mapIconUrl: string;
  email: string;
}

interface ChartSettings {
  barColour: string;
  overBarColour: string;
}

function setMapMarkerIconExtension(): any {
  if (environment.isIE11) {
    return ".png";
  } else {
    return ".svg";
  }
}

export const companies: Array<UICompany> = [
  {
    companyName: "Nationwide Platforms",
    friendlyName: "Nationwide Platforms",
    url: "https://customers.nationwideplatforms.co.uk/",
    theme: "nationwide-theme",
    icon: "nwp-fav.ico",
    chartSettings: { barColour: "#044c7e", overBarColour: "#f8cb00" },
    mapIconUrl: `../../../assets/images/blue-marker${setMapMarkerIconExtension()}`,
    email: "NO_REPLY@nationwideplatforms.co.uk"
  },
  {
    companyName: "Loxam Access",
    friendlyName: "LOXAM ACCESS",
    url: "https://clients.loxam-access.com/",
    theme: "loxam-theme",
    icon: "lox-fav.ico",
    chartSettings: { barColour: "#ce122d", overBarColour: "#f8cb00" },
    mapIconUrl: `../../../assets/images/red-marker${setMapMarkerIconExtension()}`,
    email: "NO_REPLY@loxam-access.co.uk"
  },
  {
    companyName: "Rapid Access",
    friendlyName: "Rapid Access",
    url: "https://customers.rapidaccess-gulf.com/",
    theme: "rapid-theme",
    icon: "rap-fav.ico",
    chartSettings: { barColour: "#044c7e", overBarColour: "#f8cb00" },
    mapIconUrl: `../../../assets/images/blue-marker${setMapMarkerIconExtension()}`,
    email: "NO_REPLY@rapidaccess-gulf.com"
  }
];
