export interface SignupDto {
  firstName: string;
  surName: string;
  alpha3: string;
  phoneCode: string;
  mobileNo: string;
  email: string;
}

export interface VerficationRequestDto {
  code: string;
  pinCode: string;
  availableAttempts: number;
}
export interface VerificationResponseDto {
  pinCode: string;
  password: string;
  confirmPassword: string;
}

export interface CountriesDataDto {
  data: { countryName: string; alpha3: string }[];
  error: any[];
}

export interface PhoneCodeDto {
  data: { phoneCode: number; alpha3: string }[];
  error: any[];
}

export interface OriginDto {
  data: {
    countryFlagName: string;
    countryCodeName: string;
    flag: any;
    coat: any;
    countryName?: string;
    countryFullName?: string;
  } | null;
  error: any[];
}
export interface OccupationDto {
  data: { occupationId: number; description: string }[];
  error: any[];
}

export interface CoatOfArmsResponse {
  data: CoatOfArmsDto[] | null;
  error: any[];
}

export interface CoatOfArmsDto {
  alpha3: string;
  alpha2: string;
  countryName: string;
  flagFile: string;
  coaFile: string;
}
