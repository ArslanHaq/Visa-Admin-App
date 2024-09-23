export interface DocumentGetResponseDto {
  documentId: string;
  documentName: string;
  isActive: string;
  links: DocumentLinksDto[] | null;
}

export interface DocumentGetResponse {
  data: DocumentGetResponseDto[] | null;
  error: any | null;
}

export interface DocumentLinksDto {
  id: string;
  documentId: string;
  visaSubType: string;
  visaType: string;
}
export interface ViewDocumentDto {
  applicantDocumentId: number;
  documentId: number;
  documentData: string;
  trackingId: string;
  documentName: string;
}
