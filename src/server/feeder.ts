"use server";
import {
  CountriesDataDto,
  OccupationDto,
  OriginDto,
  PhoneCodeDto,
} from "@/components/organisms/Signup.dto";
import { ApiRoutes } from "@/constants/constants";
import { visaTypeResponse } from "@/dto/ApplicationData.dto";
import { get } from "@/utils/api";

export async function getVisaTypes(): Promise<visaTypeResponse> {
  try {
    const response = await get(ApiRoutes.VISATYPES);

    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getCountryOrigin(): Promise<OriginDto> {
  try {
    const response = await get(ApiRoutes.COUNTRYORIGIN);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getCountryData(): Promise<CountriesDataDto> {
  try {
    const response = await get(ApiRoutes.COUNTRY);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getPhoneCodeData(): Promise<PhoneCodeDto> {
  try {
    const response = await get(ApiRoutes.PHONECODE);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getOccupationsData(): Promise<OccupationDto> {
  try {
    const response = await get(ApiRoutes.OCCUPATION);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
