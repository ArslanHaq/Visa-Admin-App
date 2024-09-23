"use server";
import { ApiRoutes, BackendType } from "@/constants/constants";
import {
  ApplicationListResponseDto,
  BuisnessDataResponse,
  StackholdersResponse,
} from "@/dto/ApplicationData.dto";
import { get, post } from "@/utils/api";
import logger from "@/utils/Logger";
import { comment } from "postcss";

export async function getApplicationList(
  offset: number,
  limit: number,
  status?: string
): Promise<ApplicationListResponseDto> {
  try {
    logger.info(
      `Fetching application list with offset ${offset} and limit ${limit}`
    );
    const response = await get(
      `${ApiRoutes.PROCESSINGQUEUE}/?offset=${offset}&limit=${limit}&status=${status}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched application list.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch application list: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getApplicationList: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getVerifierApplicationList(
  offset: number,
  limit: number,
  status?: string
): Promise<ApplicationListResponseDto> {
  try {
    logger.info(
      `Fetching application list with offset ${offset} and limit ${limit}`
    );
    const response = await get(
      `${ApiRoutes.REFERENCEQUEUE}/?offset=${offset}&limit=${limit}&status=${status}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched application list.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch application list: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getApplicationList: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getDecisionMakerApplicationList(
  offset: number,
  limit: number,
  status?: string
): Promise<ApplicationListResponseDto> {
  try {
    logger.info(
      `Fetching application list with offset ${offset} and limit ${limit}`
    );
    const response = await get(
      `${ApiRoutes.DECISIONQUEUE}/?offset=${offset}&limit=${limit}&status=${status}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info("Successfully fetched application list.");
      return { data: responseData.data, error: [] };
    } else {
      logger.warn(`Failed to fetch application list: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getApplicationList: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function lockApplicationUser(trackingId: string) {
  try {
    logger.info(`Locking application user with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.LOCKAPPLICATIONUSER,
      { trackingId },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully locked application user with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to lock application user: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in lockApplicationUser: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
export async function lockVerifierApplicationUser(trackingId: string) {
  try {
    logger.info(`Locking application user with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.LOCKVERIFIERAPPLICATIONUSER,
      { trackingId },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully locked application user with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to lock application user: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in lockApplicationUser: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function lockDecisionMakerApplicationUser(trackingId: string) {
  try {
    logger.info(`Locking application user with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.LOCKDECISIONMAKERAPPLICATIONUSER,
      { trackingId },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully locked application user with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to lock application user: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in lockApplicationUser: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getApplicationData(trackingId: string) {
  try {
    logger.info(`Fetching application data for trackingId ${trackingId}`);
    const response = await get(
      `${ApiRoutes.APPLICATIONDATA}?TrackingId=${trackingId}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully fetched application data for trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to fetch application data: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in getApplicationData: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function proceedApplication(
  trackingId: string,
  isApproved: string,
  comment: string
) {
  try {
    console.log("trackingId", trackingId, isApproved);
    logger.info(`Proceeding application with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.PROCEEDAPPLICATION,
      { trackingId, isApproved, comment },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully proceeded application with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to proceed application: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in proceedApplication: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function proceedVerifierApplication(
  trackingId: string,
  isSupported: string,
  comments: string
) {
  try {
    logger.info(`Proceeding application with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.PROCEEDVERIFIERAPPLICATION,
      {
        trackingId: trackingId,
        isSupported: isSupported,
        comments: comments,
      },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully proceeded application with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to proceed application: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in proceedApplication: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function defferedApplication(trackingId: string) {
  try {
    logger.info(`Proceeding application with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.DEFFEREDAPPLICATION,
      { trackingId },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully proceeded application with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to proceed application: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in proceedApplication: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function referToUserApplication(
  trackingId: string,
  comment: string
) {
  try {
    logger.info(`Proceeding application with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.REFFEREDTOUSERAPPLICATION,
      { trackingId, comment },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();
    if (response.ok) {
      logger.info(
        `Successfully proceeded application with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to proceed application: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in proceedApplication: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getStackHoldersComments(
  trackingId: string
): Promise<StackholdersResponse> {
  try {
    logger.info(`Proceeding application with trackingId ${trackingId}`);
    const response = await get(
      `${ApiRoutes.STACKHOLDERCOMMENTS}?trackingId=${trackingId}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully proceeded application with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to proceed application: ${responseData.error}`);
      return { data: null as any, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in proceedApplication: ${error.message}`);
    return {
      data: null as any,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function approveDecisionMakerApplication(
  trackingId: string,
  decisionComments: string,
  decision: string,
  durationId: string,
  entryType: string,
  expiryDate: string
) {
  try {
    logger.info(`Proceeding application with trackingId ${trackingId}`);
    const response = await post(
      ApiRoutes.APPROVEAPPLICATION,
      {
        trackingId: trackingId,
        decisionComments: decisionComments,
        decision: decision,
        durationId: durationId,
        entryType: entryType,
        expiryDate: expiryDate,
      },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully proceeded application with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to proceed application: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in proceedApplication: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getBuisnessRuleData(
  trackingId: string
): Promise<BuisnessDataResponse> {
  try {
    logger.info(`Proceeding application with trackingId ${trackingId}`);
    const response = await get(
      `${ApiRoutes.BUISNESSRULEDATA}/${trackingId}`,
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully proceeded application with trackingId ${trackingId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to proceed application: ${responseData.error}`);
      return { data: null as any, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in proceedApplication: ${error.message}`);
    return {
      data: null as any,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}
