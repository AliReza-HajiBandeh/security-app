export interface SignupDto {
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    username: string;
    mobileNumber: string;
    password: string;
    isReal: boolean;
    nationalCode?: string;
    nationalId?: string;
    registerNumber?: string;
}

export type Token = {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  token_type: string,
  jti: string
}

export class PasswordDto {
  verificationCode?: string;
  currentPassword?: string;
  newPassword?: string;
}

export class ForgetPasswordDto {
  userName?: string;
  referralCode?: string;
  newPassword?: string;
}
