export interface visaTypeRequestDto {
  description: string;
  visaType?: string;
  isActive?: string;
}

export interface countryRequestDto {
  alpha3: string;
  isActive: string;
}

export interface countryResponseDto {
  alpha3: string;
  countryName: string;
}

export interface visaDurationDto {
  duration: string;
  durationId?: number;
  isActive: string;
}

export interface visaSubTypeDto {
  description: string;
  visaSubType?: string;
  visaType: string;
  isActive?: string;
}

export interface buisnessRuleRequestDto {
  name: string;
  minAge?: number | null;
  maxAge?: number | null;
  sex?: string;
  interviewRequired?: string;
  otherRequirements?: string;
  countries: string[];
  visaTypes: number[] | null;
  stakeHolders: number[] | null;
  documents: number[] | null;
}

export interface buisnessRuleDto {
  businessRuleId: number;
  name: string;
  minAge?: number | null;
  maxAge?: number | null;
  sex?: string;
  interviewRequired?: string;
  otherRequirements?: string;
  countries: {
    alpha3: string | null;
    countryName: string | null;
    isActive: string | null;
  }[];
  visaTypes:
    | {
        description: string | null;
        visaType: string | null;
      }[]
    | null;
  stakeHolders:
    | {
        description: string | null;
        roleId: number | null;
        stakeHolderId: number | null;
      }[]
    | null;
  documents:
    | {
        documentId: number | null;
        documentName: string | null;
      }[]
    | null;
  status?: string;
}

export interface buisnessRuleResponseDto {
  data: buisnessRuleDto[];
  error: any[];
}

export interface viewBuisnessRuleDto {
  data: buisnessRuleDto | null;
  error: any[] | null;
}
