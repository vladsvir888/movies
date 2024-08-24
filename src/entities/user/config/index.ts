export const passwordErrorMessage =
  "Password needs to be at least 4 characters long";

interface AuthData {
  expires_at: string;
  request_token: string;
  success: boolean;
}

export interface TokenData extends AuthData {}

export interface LoginData extends AuthData {}

export type SessionData = Pick<AuthData, "success"> & {
  session_id: string;
};

export type AuthError = Pick<AuthData, "success"> & {
  status_code: number;
  status_message: string;
};
