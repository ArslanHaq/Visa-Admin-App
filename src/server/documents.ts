"use server";

import { ApiRoutes, BackendType } from "@/constants/constants";
import { DocumentGetResponse } from "@/dto/documentData.dto";
import { get, post } from "@/utils/api";
import logger from "@/utils/Logger";

export async function addDocument(documentName: string, documentId?: string) {
  try {
    logger.info(`Adding Document ${documentName}`);
    const response = await post(
      ApiRoutes.ADDDOCUMENT,
      {
        documentName,
        documentId,
      },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully add document with document name =  ${documentName}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to add document: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in addDocument: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getDocuments(): Promise<DocumentGetResponse> {
  try {
    logger.info(`Getting Document`);
    const response = await get(ApiRoutes.ADDDOCUMENT, BackendType.BACKEND_2);
    const responseData = await response.json();

    if (response.ok) {
      logger.info(`Successfully get document`);
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to get document: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in addDocument: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function addDocumentLink(
  documentId: number,
  visaType: number,
  visaSubType: any
) {
  console.log(documentId, visaType, visaSubType);
  try {
    logger.info(`Adding Document Link ${documentId}`);
    const response = await post(
      ApiRoutes.ADDDOCUMENTLINK,
      {
        documentId,
        visaType,
        visaSubType,
      },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully add document link with document id =  ${documentId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to add document link: ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in addLinkDocument: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function disableDocument(documentId: number, isActive: string) {
  try {
    logger.info(`Disabling Document  ${documentId}`);
    const response = await post(
      ApiRoutes.DISABLEDOCUMENT,
      {
        documentId,
        isActive,
      },
      BackendType.BACKEND_2
    );
    const responseData = await response.json();

    if (response.ok) {
      logger.info(
        `Successfully disabled document with document id =  ${documentId}`
      );
      logger.info(responseData);
      return { data: responseData, error: null };
    } else {
      logger.warn(`Failed to disable document : ${responseData.error}`);
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    logger.error(`Error in disableDocument: ${error.message}`);
    return {
      data: null,
      error: [{ description: "An unexpected error occurred", code: "500" }],
    };
  }
}

export async function getUploadedDocuments(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.GETALLDOCUMENTS}?TrackingId=${trackingId}`,
      BackendType.BACKEND_2
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: "Unauthorized", code: "401" }],
      };
    }
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
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

export async function getDocumentData(
  trackingId: string,
  applicantDocumentId: string
) {
  try {
    const response = await get(
      `${ApiRoutes.GETDOCUMENTDATA}?TrackingId=${trackingId}&DocumentId=${applicantDocumentId}`,
      BackendType.BACKEND_2
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: "Unauthorized", code: "401" }],
      };
    }
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
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
