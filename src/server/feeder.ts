"use server";
import {
  CountriesDataDto,
  OccupationResponse,
  OriginDto,
  PhoneCodeDto,
} from "@/components/organisms/Signup.dto";
import { ApiRoutes, BackendType } from "@/constants/constants";
import { visaTypeResponse } from "@/dto/ApplicationData.dto";
import {
  buisnessRuleRequestDto,
  buisnessRuleResponseDto,
  viewBuisnessRuleDto,
} from "@/dto/libraries.dto";
import { get, post } from "@/utils/api";
import logger from "@/utils/Logger";

export async function getVisaTypes(): Promise<visaTypeResponse> {
  try {
    logger.info(`Fetching visa types from ${ApiRoutes.VISATYPES}`);
    const response = await get(ApiRoutes.VISATYPES, BackendType.BACKEND_2);
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched visa types.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch visa types: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getVisaTypes: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getCountryOrigin(): Promise<OriginDto> {
  try {
    logger.info(`Fetching country origin data from ${ApiRoutes.COUNTRYORIGIN}`);
    const response = await get(ApiRoutes.COUNTRYORIGIN, BackendType.BACKEND_2);
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched country origin data.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch country origin data: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getCountryOrigin: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getCountryData(
  isActive?: string
): Promise<CountriesDataDto> {
  try {
    logger.info(`Fetching country data from ${ApiRoutes.COUNTRY}`);
    const response = await get(
      `${ApiRoutes.COUNTRY}/?isActive=${isActive ? isActive : "t"}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched country data.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch country data: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getCountryData: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getOccupationData(): Promise<OccupationResponse> {
  try {
    logger.info(`Fetching country data from ${ApiRoutes.COUNTRY}`);
    const response = await get(
      `${ApiRoutes.OCCUPATION}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched country data.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch country data: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getCountryData: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getVisaDuration(): Promise<any> {
  try {
    logger.info(`Fetching country data from ${ApiRoutes.COUNTRY}`);
    const response = await get(
      `${ApiRoutes.VISADURATION}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched country data.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch country data: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getCountryData: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
export async function getPhoneCodeData(): Promise<PhoneCodeDto> {
  try {
    logger.info(`Fetching phone code data from ${ApiRoutes.PHONECODE}`);
    const response = await get(ApiRoutes.PHONECODE, BackendType.BACKEND_2);
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched phone code data.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch phone code data: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getPhoneCodeData: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getOccupationsData(): Promise<OccupationResponse> {
  try {
    logger.info(`Fetching occupations data from ${ApiRoutes.OCCUPATION}`);
    const response = await get(ApiRoutes.OCCUPATION, BackendType.BACKEND_2);
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched occupations data.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch occupations data: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getOccupationsData: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getVisaSubTypes(visaType: string): Promise<any> {
  try {
    logger.info(`Fetching visa types from ${ApiRoutes.VISATYPES}`);
    const response = await get(
      `${ApiRoutes.VISASUBTYPES}/?VisaType=${visaType}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched visa types.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch visa types: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getVisaTypes: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getStackHolderRoles(): Promise<any> {
  try {
    const response = await get(`${ApiRoutes.ROLES}`, BackendType.BACKEND_2);
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched visa types.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch visa types: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getVisaTypes: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getBuisnessRules(): Promise<buisnessRuleResponseDto> {
  try {
    const response = await get(
      `${ApiRoutes.BUISENESSRULES}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched visa types.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch visa types: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getVisaTypes: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
export async function getBuisnessRule(
  businessRuleId: string
): Promise<viewBuisnessRuleDto> {
  try {
    const response = await get(
      `${ApiRoutes.BUISENESSRULES}/${businessRuleId}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched visa types.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch visa types: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getVisaTypes: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
export async function addBuisnessRules(
  data: buisnessRuleRequestDto
): Promise<any> {
  try {
    console.log(data);
    const response = await post(
      `${ApiRoutes.BUISENESSRULES}`,
      data,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully added Buisness Rule.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Filed to add buiness rule: ${responseData.error}`);
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in addBuisnessRule: ${error.message}`);
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
