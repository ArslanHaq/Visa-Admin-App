"use server";
import { ApiRoutes } from "@/constants/constants";
import { ApplicationListResponseDto } from "@/dto/ApplicationData.dto";
import { get } from "@/utils/api";

export async function getApplicationList(
  offset: number,
  limit: number
): Promise<ApplicationListResponseDto> {
  try {
    const response = await get(
      `${ApiRoutes.PROCESSINGQUEUE}/?offset=${offset}&limit=${limit}`
    );
    const responseData = await response.json();
    console.log("responseData", responseData);
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
