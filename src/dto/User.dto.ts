export interface UserDto {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: string;
  stakeHolderId: string;
  stakeHolderDescription?: string;
}

export interface UserCreateDto {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: string;
  stackHolderId: number;
}

export interface StackHolderDto {
  description: string;
  roleId: number;
  stakeHolderId?: number;
}
export interface UserResponseDto {
  data: {
    dataList: UserDto[];
    totalCount: number;
  } | null;
  error: any[] | null;
}

export interface StakeHolderDto {
  description: string;
  roleId: number;
  stakeHolderId: number;
}

export interface StakeHolderResponseDto {
  data: {
    dataList: StakeHolderDto[];
    totalCount: number;
  } | null;
  error: any[] | null;
}

export interface DocumentResponseDto {
  data: DocumentDto[] | null;
  error: any[] | null;
}

export interface DocumentDto {
  documentId: number;
  documentName: string;
}
