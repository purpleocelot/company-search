export interface Token {
  accessToken: string;
  expiresIn: number;
  isAdmin: boolean;
  userName: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  isAdmin: string;
  token_type: string;
  userName: string;
}
