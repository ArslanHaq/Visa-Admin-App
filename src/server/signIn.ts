"use server";

import { ApiRoutes } from "@/constants/constants";
import { ApiResponse, SignInDto } from "@/dto/SignIn.dto";
import { post } from "@/utils/api";

export async function login(data: SignInDto) {
  try {
    const response = await post(ApiRoutes.LOGIN, data);
    const responseData: ApiResponse = await response.json();
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
