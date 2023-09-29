export interface User {
  id: string;
  isAdmin: boolean;
  sites: string;
  userName: string;
  enabled: boolean;
  sendEmail: boolean;
  language: string;
  company: string;
}

export class User implements User {
  id: string;
  isAdmin: boolean;
  sites: string;
  userName: string;
  enabled: boolean;
  sendEmail: boolean;
  language: string;
  company: string;
}

export class UserDto {
  id: string;
  isAdmin: boolean;
  email: string;
  sitePermissions: Array<number>;
  sendEmail: boolean;
  language: string;
  company: string;
}
