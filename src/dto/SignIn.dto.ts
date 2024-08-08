export interface SignInDto {
  userName: string;
  password: string;
}
export interface ForgotPasswordDto {
  password: string;
  confirmPassword: string;
}
export interface ForgotPasswordErrors {
  password: string;
  confirmPassword: string;
}
export interface UserData {
  accessToken: string;
  refreshToken: string;
  username: string;
  userEmail: string;
  changedPassword: string | null;
  roles: string[];
  onboard_P: string;
}

export interface ApiResponse {
  data: UserData;
  error: any[];
}

export default interface LoggedInUser {
  id: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  userEmail: string;
  changedPassword: string | null;
  roles: string[];
  onboard_P: string;
}
export interface QRCodeData {
  code: string;
  qrUri: string;
  userName: string;
}
export interface QRCode {
  data: QRCodeData;
  error: any[];
}
