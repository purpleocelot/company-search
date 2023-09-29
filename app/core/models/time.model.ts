export interface Timezone {
  name: string;
  value: string;
}

export interface IWorkingHours {
  day?: IDay;
  workingDayNumber: number;
  isActive: boolean;
  operatingStartDayTime: string;
  operatingEndDayTime: string;
}

export class WorkingHours implements IWorkingHours {
  day?: IDay;
  workingDayNumber: number;
  isActive: boolean;
  operatingStartDayTime: string;
  operatingEndDayTime: string;

  constructor(workingHoursDay: IWorkingHours) {
    this.workingDayNumber = workingHoursDay.workingDayNumber;
    this.isActive = workingHoursDay.isActive;
    this.operatingEndDayTime = workingHoursDay.operatingEndDayTime;
    this.operatingStartDayTime = workingHoursDay.operatingStartDayTime;

    this.day = days.find(day => day.workingDayNumber === this.workingDayNumber);
  }
}

export interface IDay {
  workingDayNumber: number;
  name: string;
}

export const days: Array<IDay> = [
  { workingDayNumber: 1, name: "Sunday" },
  { workingDayNumber: 2, name: "Monday" },
  { workingDayNumber: 3, name: "Tuesday" },
  { workingDayNumber: 4, name: "Wednesday" },
  { workingDayNumber: 5, name: "Thursday" },
  { workingDayNumber: 6, name: "Friday" },
  { workingDayNumber: 7, name: "Saturday" }
];

export const timezones: Array<Timezone> = [
  {
    value: "Dateline Standard Time",
    name: "(UTC-12:00) International Date Line West"
  },
  { value: "UTC-11", name: "(UTC-11:00) Coordinated Universal Time-11" },
  { value: "Aleutian Standard Time", name: "(UTC-10:00) Aleutian Islands" },
  { value: "Hawaiian Standard Time", name: "(UTC-10:00) Hawaii" },
  { value: "Marquesas Standard Time", name: "(UTC-09:30) Marquesas Islands" },
  { value: "Alaskan Standard Time", name: "(UTC-09:00) Alaska" },
  { value: "UTC-09", name: "(UTC-09:00) Coordinated Universal Time-09" },
  {
    value: "Pacific Standard Time (Mexico)",
    name: "(UTC-08:00) Baja California"
  },
  { value: "UTC-08", name: "(UTC-08:00) Coordinated Universal Time-08" },
  {
    value: "Pacific Standard Time",
    name: "(UTC-08:00) Pacific Time (US &amp; Canada)"
  },
  { value: "US Mountain Standard Time", name: "(UTC-07:00) Arizona" },
  {
    value: "Mountain Standard Time (Mexico)",
    name: "(UTC-07:00) Chihuahua, La Paz, Mazatlan"
  },
  {
    value: "Mountain Standard Time",
    name: "(UTC-07:00) Mountain Time (US &amp; Canada)"
  },
  {
    value: "Central America Standard Time",
    name: "(UTC-06:00) Central America"
  },
  {
    value: "Central Standard Time",
    name: "(UTC-06:00) Central Time (US &amp; Canada)"
  },
  { value: "Easter Island Standard Time", name: "(UTC-06:00) Easter Island" },
  {
    value: "Central Standard Time (Mexico)",
    name: "(UTC-06:00) Guadalajara, Mexico City, Monterrey"
  },
  { value: "Canada Central Standard Time", name: "(UTC-06:00) Saskatchewan" },
  {
    value: "SA Pacific Standard Time",
    name: "(UTC-05:00) Bogota, Lima, Quito, Rio Branco"
  },
  { value: "Eastern Standard Time (Mexico)", name: "(UTC-05:00) Chetumal" },
  {
    value: "Eastern Standard Time",
    name: "(UTC-05:00) Eastern Time (US &amp; Canada)"
  },
  { value: "Haiti Standard Time", name: "(UTC-05:00) Haiti" },
  { value: "Cuba Standard Time", name: "(UTC-05:00) Havana" },
  { value: "US Eastern Standard Time", name: "(UTC-05:00) Indiana (East)" },
  { value: "Paraguay Standard Time", name: "(UTC-04:00) Asuncion" },
  {
    value: "Atlantic Standard Time",
    name: "(UTC-04:00) Atlantic Time (Canada)"
  },
  { value: "Venezuela Standard Time", name: "(UTC-04:00) Caracas" },
  { value: "Central Brazilian Standard Time", name: "(UTC-04:00) Cuiaba" },
  {
    value: "SA Western Standard Time",
    name: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan"
  },
  { value: "Pacific SA Standard Time", name: "(UTC-04:00) Santiago" },
  {
    value: "Turks And Caicos Standard Time",
    name: "(UTC-04:00) Turks and Caicos"
  },
  { value: "Newfoundland Standard Time", name: "(UTC-03:30) Newfoundland" },
  { value: "Tocantins Standard Time", name: "(UTC-03:00) Araguaina" },
  { value: "E. South America Standard Time", name: "(UTC-03:00) Brasilia" },
  { value: "SA Eastern Standard Time", name: "(UTC-03:00) Cayenne, Fortaleza" },
  {
    value: "Argentina Standard Time",
    name: "(UTC-03:00) City of Buenos Aires"
  },
  { value: "Greenland Standard Time", name: "(UTC-03:00) Greenland" },
  { value: "Montevideo Standard Time", name: "(UTC-03:00) Montevideo" },
  { value: "Magallanes Standard Time", name: "(UTC-03:00) Punta Arenas" },
  {
    value: "Saint Pierre Standard Time",
    name: "(UTC-03:00) Saint Pierre and Miquelon"
  },
  { value: "Bahia Standard Time", name: "(UTC-03:00) Salvador" },
  { value: "UTC-02", name: "(UTC-02:00) Coordinated Universal Time-02" },
  {
    value: "Mid-Atlantic Standard Time",
    name: "(UTC-02:00) Mid-Atlantic - Old"
  },
  { value: "Azores Standard Time", name: "(UTC-01:00) Azores" },
  { value: "Cape Verde Standard Time", name: "(UTC-01:00) Cabo Verde Is." },
  { value: "UTC", name: "(UTC) Coordinated Universal Time" },
  { value: "Morocco Standard Time", name: "(UTC+00:00) Casablanca" },
  {
    value: "GMT Standard Time",
    name: "(UTC+00:00) Dublin, Edinburgh, Lisbon, London"
  },
  { value: "Greenwich Standard Time", name: "(UTC+00:00) Monrovia, Reykjavik" },
  {
    value: "W. Europe Standard Time",
    name: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
  },
  {
    value: "Central Europe Standard Time",
    name: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
  },
  {
    value: "Romance Standard Time",
    name: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris"
  },
  {
    value: "Central European Standard Time",
    name: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
  },
  {
    value: "W. Central Africa Standard Time",
    name: "(UTC+01:00) West Central Africa"
  },
  { value: "Namibia Standard Time", name: "(UTC+01:00) Windhoek" },
  { value: "Jordan Standard Time", name: "(UTC+02:00) Amman" },
  { value: "GTB Standard Time", name: "(UTC+02:00) Athens, Bucharest" },
  { value: "Middle East Standard Time", name: "(UTC+02:00) Beirut" },
  { value: "Egypt Standard Time", name: "(UTC+02:00) Cairo" },
  { value: "E. Europe Standard Time", name: "(UTC+02:00) Chisinau" },
  { value: "Syria Standard Time", name: "(UTC+02:00) Damascus" },
  { value: "West Bank Standard Time", name: "(UTC+02:00) Gaza, Hebron" },
  { value: "South Africa Standard Time", name: "(UTC+02:00) Harare, Pretoria" },
  {
    value: "FLE Standard Time",
    name: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
  },
  { value: "Israel Standard Time", name: "(UTC+02:00) Jerusalem" },
  { value: "Kaliningrad Standard Time", name: "(UTC+02:00) Kaliningrad" },
  { value: "Libya Standard Time", name: "(UTC+02:00) Tripoli" },
  { value: "Arabic Standard Time", name: "(UTC+03:00) Baghdad" },
  { value: "Turkey Standard Time", name: "(UTC+03:00) Istanbul" },
  { value: "Arab Standard Time", name: "(UTC+03:00) Kuwait, Riyadh" },
  { value: "Belarus Standard Time", name: "(UTC+03:00) Minsk" },
  {
    value: "Russian Standard Time",
    name: "(UTC+03:00) Moscow, St. Petersburg, Volgograd"
  },
  { value: "E. Africa Standard Time", name: "(UTC+03:00) Nairobi" },
  { value: "Iran Standard Time", name: "(UTC+03:30) Tehran" },
  { value: "Arabian Standard Time", name: "(UTC+04:00) Abu Dhabi, Muscat" },
  {
    value: "Astrakhan Standard Time",
    name: "(UTC+04:00) Astrakhan, Ulyanovsk"
  },
  { value: "Azerbaijan Standard Time", name: "(UTC+04:00) Baku" },
  { value: "Russia Time Zone 3", name: "(UTC+04:00) Izhevsk, Samara" },
  { value: "Mauritius Standard Time", name: "(UTC+04:00) Port Louis" },
  { value: "Saratov Standard Time", name: "(UTC+04:00) Saratov" },
  { value: "Georgian Standard Time", name: "(UTC+04:00) Tbilisi" },
  { value: "Caucasus Standard Time", name: "(UTC+04:00) Yerevan" },
  { value: "Afghanistan Standard Time", name: "(UTC+04:30) Kabul" },
  { value: "West Asia Standard Time", name: "(UTC+05:00) Ashgabat, Tashkent" },
  { value: "Ekaterinburg Standard Time", name: "(UTC+05:00) Ekaterinburg" },
  { value: "Pakistan Standard Time", name: "(UTC+05:00) Islamabad, Karachi" },
  {
    value: "India Standard Time",
    name: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi"
  },
  { value: "Sri Lanka Standard Time", name: "(UTC+05:30) Sri Jayawardenepura" },
  { value: "Nepal Standard Time", name: "(UTC+05:45) Kathmandu" },
  { value: "Central Asia Standard Time", name: "(UTC+06:00) Astana" },
  { value: "Bangladesh Standard Time", name: "(UTC+06:00) Dhaka" },
  { value: "Omsk Standard Time", name: "(UTC+06:00) Omsk" },
  { value: "Myanmar Standard Time", name: "(UTC+06:30) Yangon (Rangoon)" },
  {
    value: "SE Asia Standard Time",
    name: "(UTC+07:00) Bangkok, Hanoi, Jakarta"
  },
  { value: "Altai Standard Time", name: "(UTC+07:00) Barnaul, Gorno-Altaysk" },
  { value: "W. Mongolia Standard Time", name: "(UTC+07:00) Hovd" },
  { value: "North Asia Standard Time", name: "(UTC+07:00) Krasnoyarsk" },
  { value: "N. Central Asia Standard Time", name: "(UTC+07:00) Novosibirsk" },
  { value: "Tomsk Standard Time", name: "(UTC+07:00) Tomsk" },
  {
    value: "China Standard Time",
    name: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
  },
  { value: "North Asia East Standard Time", name: "(UTC+08:00) Irkutsk" },
  {
    value: "Singapore Standard Time",
    name: "(UTC+08:00) Kuala Lumpur, Singapore"
  },
  { value: "W. Australia Standard Time", name: "(UTC+08:00) Perth" },
  { value: "Taipei Standard Time", name: "(UTC+08:00) Taipei" },
  { value: "Ulaanbaatar Standard Time", name: "(UTC+08:00) Ulaanbaatar" },
  { value: "North Korea Standard Time", name: "(UTC+08:30) Pyongyang" },
  { value: "Aus Central W. Standard Time", name: "(UTC+08:45) Eucla" },
  { value: "Transbaikal Standard Time", name: "(UTC+09:00) Chita" },
  { value: "Tokyo Standard Time", name: "(UTC+09:00) Osaka, Sapporo, Tokyo" },
  { value: "Korea Standard Time", name: "(UTC+09:00) Seoul" },
  { value: "Yakutsk Standard Time", name: "(UTC+09:00) Yakutsk" },
  { value: "Cen. Australia Standard Time", name: "(UTC+09:30) Adelaide" },
  { value: "AUS Central Standard Time", name: "(UTC+09:30) Darwin" },
  { value: "E. Australia Standard Time", name: "(UTC+10:00) Brisbane" },
  {
    value: "AUS Eastern Standard Time",
    name: "(UTC+10:00) Canberra, Melbourne, Sydney"
  },
  {
    value: "West Pacific Standard Time",
    name: "(UTC+10:00) Guam, Port Moresby"
  },
  { value: "Tasmania Standard Time", name: "(UTC+10:00) Hobart" },
  { value: "Vladivostok Standard Time", name: "(UTC+10:00) Vladivostok" },
  { value: "Lord Howe Standard Time", name: "(UTC+10:30) Lord Howe Island" },
  {
    value: "Bougainville Standard Time",
    name: "(UTC+11:00) Bougainville Island"
  },
  { value: "Russia Time Zone 10", name: "(UTC+11:00) Chokurdakh" },
  { value: "Magadan Standard Time", name: "(UTC+11:00) Magadan" },
  { value: "Norfolk Standard Time", name: "(UTC+11:00) Norfolk Island" },
  { value: "Sakhalin Standard Time", name: "(UTC+11:00) Sakhalin" },
  {
    value: "Central Pacific Standard Time",
    name: "(UTC+11:00) Solomon Is., New Caledonia"
  },
  {
    value: "Russia Time Zone 11",
    name: "(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky"
  },
  {
    value: "New Zealand Standard Time",
    name: "(UTC+12:00) Auckland, Wellington"
  },
  { value: "UTC+12", name: "(UTC+12:00) Coordinated Universal Time+12" },
  { value: "Fiji Standard Time", name: "(UTC+12:00) Fiji" },
  {
    value: "Kamchatka Standard Time",
    name: "(UTC+12:00) Petropavlovsk-Kamchatsky - Old"
  },
  {
    value: "Chatham Islands Standard Time",
    name: "(UTC+12:45) Chatham Islands"
  },
  { value: "UTC+13", name: "(UTC+13:00) Coordinated Universal Time+13" },
  { value: "Tonga Standard Time", name: "(UTC+13:00) Nuku&#39;alofa" },
  { value: "Samoa Standard Time", name: "(UTC+13:00) Samoa" },
  { value: "Line Islands Standard Time", name: "(UTC+14:00) Kiritimati Island" }
];

export const defaultWorkHours: Array<IWorkingHours> = [
  {
    day: { workingDayNumber: 1, name: "Sunday" },
    workingDayNumber: 1,
    isActive: false,
    operatingStartDayTime: null,
    operatingEndDayTime: null
  },
  {
    day: { workingDayNumber: 2, name: "Monday" },
    workingDayNumber: 2,
    isActive: true,
    operatingStartDayTime: "07:30:00",
    operatingEndDayTime: "18:00:00"
  },
  {
    day: { workingDayNumber: 3, name: "Tuesday" },
    workingDayNumber: 3,
    isActive: true,
    operatingStartDayTime: "07:30:00",
    operatingEndDayTime: "18:00:00"
  },
  {
    day: { workingDayNumber: 4, name: "Wednesday" },
    workingDayNumber: 4,
    isActive: true,
    operatingStartDayTime: "07:30:00",
    operatingEndDayTime: "18:00:00"
  },
  {
    day: { workingDayNumber: 5, name: "Thursday" },
    workingDayNumber: 5,
    isActive: true,
    operatingStartDayTime: "07:30:00",
    operatingEndDayTime: "18:00:00"
  },
  {
    day: { workingDayNumber: 6, name: "Friday" },
    workingDayNumber: 6,
    isActive: true,
    operatingStartDayTime: "07:30:00",
    operatingEndDayTime: "18:00:00"
  },
  {
    day: { workingDayNumber: 7, name: "Saturday" },
    workingDayNumber: 7,
    isActive: false,
    operatingStartDayTime: null,
    operatingEndDayTime: null
  }
];
