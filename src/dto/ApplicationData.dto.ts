export interface ViewApplicationDataDto {
  applicationData: ApplicationDataRequestDto | null;
  personalInformation: personalDetailsDto | null;
  contactDetail: ContactDetailsDto | null;
  financialInformation: FinancialDetailsDto | null;
  travelPlan: TravelPlanDto | null;
}
export interface ApplicationDataDto {
  visaType: string;
  visaSubType: string;
  nationality: string;
  visaFee: string;
  visaCurrency: {
    alpha3: string;
    countryName: string;
    currencyName: string;
  };
}
export interface ApplicationDataRequestDto {
  visaType: string;
  visaSubType: string;
  nationality: string;
  visaFee: string;
  visaCurrency: string;
  trackingId?: string;
  status?: string;
}
export interface ApplicationRequestDto {
  data: ApplicationDataDto | null;
  error: any[];
}

export interface visaTypeDto {
  visaType: string;
  description: string;
}
export interface visaTypeResponse {
  data: visaTypeDto[];
  error: any[];
}

export interface personalDetailsDto {
  trackingId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  sex: string;
  maritalStatus: string;
  nationality: string;
  passportNumber: string;
  issuingCountry: string;
  occupation: string;
  photographBase64: string;
}

export interface ContactDetailsDto {
  trackingId: string;
  email1: string;
  email2: string;
  landline1: string;
  landline2: string;
  mobile1: string;
  phoneCode1: string;
  mobile2: string;
  phoneCode2: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ApplicationResponseDto {
  insertionTimestamp: string;
  lastSection: string;
  nationality: string;
  status: string;
  trackingId: string;
  userId: string;
  visaCurrency: string;
  visaFee: string;
  visaSubType: string;
  visaType: string;
}
export interface ApplicationSubmitResponseDto {
  data: ApplicationResponseDto;
  error: any;
}

export interface FinancialDetailsDto {
  trackingId: string;
  sponsorType: string;
  sponsorDetails: string;
  cashHoldingAmount: string;
  accomodationType: string;
  hotelName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  postalCode: string;
  currency?: string;
}

export interface TravelPlanDto {
  trackingId: string;
  travelDate: string;
  arrivalPort: string;
  cities: string;
  travelHistory?: TravelHistory[];
}

export interface TravelHistory {
  travelDate: string;
  finalDestination: string;
  travelPurpose: string;
}

export interface InboxDto {
  trackingId: string;
  appliedOn: string;
  status: string;
}

export interface ApplicationListResponseDto {
  data: {
    dataList: DataList[];
    totalCount: number;
  } | null;
  error: any[];
}
export interface DataList {
  trackingId: string;
  status: string;
  userId: string;
  visaType: string;
  visaSubType: string;
  nationality: string;
  visaFee: string;
  visaCurrency: string;
  lastSection: string;
}
