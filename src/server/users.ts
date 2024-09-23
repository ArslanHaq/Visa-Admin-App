"use server";

import { ApiRoutes, BackendType } from "@/constants/constants";
import {
  DocumentResponseDto,
  StackHolderDto,
  StakeHolderResponseDto,
  UserCreateDto,
  UserDto,
  UserResponseDto,
} from "@/dto/User.dto";
import { get, post } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function addUser(data: UserCreateDto) {
  try {
    const response = await post(ApiRoutes.ADDUSER, data, BackendType.BACKEND_2);
    const responseData = await response.json();

    if (response.ok) {
      return { data: responseData.data, error: null };
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

export async function getUsers(
  offset: number,
  limit: number,
  status: string,
  value?: string | null
): Promise<UserResponseDto> {
  console.log("getUsers", value);
  try {
    const response = await get(
      `${ApiRoutes.GETUSERS}/?offset=${offset}&limit=${limit}&status=${status}&value=${value}`,
      BackendType.BACKEND_2
    );
    const responseData: UserResponseDto = await response.json();

    if (response.ok) {
      return { data: responseData.data, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    console.log("error", error);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function addStakeHolder(data: StackHolderDto) {
  try {
    const response = await post(
      ApiRoutes.ADDSTACKHOLDER,
      data,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      revalidatePath("/users");
      return { data: responseData.data, error: null };
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
export async function getStackHolders(
  offset: number,
  limit: number,
  status: string,
  value?: string | null
): Promise<StakeHolderResponseDto> {
  try {
    const response = await get(
      `${ApiRoutes.GETSTACKHOLDERS}/?offset=${offset}&limit=${limit}`,
      BackendType.BACKEND_2
    );
    const responseData: StakeHolderResponseDto = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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
export async function getVerifiedStackHolders(
  offset: number,
  limit: number,
  status: string,
  value?: string | null
): Promise<StakeHolderResponseDto> {
  try {
    const response = await get(
      `${ApiRoutes.GETVERIFIEDSTACKHOLDERS}/?offset=${offset}&limit=${limit}`,
      BackendType.BACKEND_2
    );
    const responseData: StakeHolderResponseDto = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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

export async function getDocuments(): Promise<DocumentResponseDto> {
  try {
    const response = await get(
      `${ApiRoutes.GETDOCUMENTS}`,
      BackendType.BACKEND_2
    );
    const responseData: any = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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
