"use server";

import { ApiRoutes, BackendType } from "@/constants/constants";
import {
  countryRequestDto,
  visaDurationDto,
  visaSubTypeDto,
  visaTypeRequestDto,
} from "@/dto/libraries.dto";
import { post } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function addVisaType(data: visaTypeRequestDto) {
  try {
    const response = await post(
      ApiRoutes.ADDVISATYPE,
      data,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      return { data: responseData.data, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function addOccupation(
  description: string,
  isActive: string,
  occupationId?: string
) {
  try {
    const response = await post(
      ApiRoutes.ADDOCCUPATION,
      { occupationId, description, isActive },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      return { data: responseData.data, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
export async function addCountry(data: countryRequestDto) {
  try {
    const response = await post(
      ApiRoutes.ADDCOUNTRY,
      data,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      revalidatePath("/libraries");
      return { data: responseData.data, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function removeActivity(data: visaDurationDto) {
  try {
    const response = await post(
      ApiRoutes.UPDATEVISADURATION,
      data,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      revalidatePath("/libraries");
      return { data: responseData.data, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function addDuration(data: visaDurationDto) {
  try {
    const response = await post(
      ApiRoutes.UPDATEVISADURATION,
      data,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      revalidatePath("/libraries");
      return { data: responseData.data, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function addVisaSubType(data: visaSubTypeDto) {
  try {
    const response = await post(
      ApiRoutes.ADDVISASUBTYPE,
      data,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      revalidatePath("/libraries");
      return { data: responseData.data, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
