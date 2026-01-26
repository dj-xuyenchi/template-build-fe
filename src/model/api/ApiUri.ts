import { BaseDataTable } from "../BaseDataTable";
import { BaseRequest } from "../BaseRequest";

export interface ApiUri extends BaseDataTable {
  apiUriId: number;
  createdAt: Date;
  apiName: string;
  description?: string;
  createdBy: string;
  status: string;
  updatedAt?: Date;
  updatedBy?: string;
  action: string;
  applicationId: number;
  applicationName: string;
  isWhiteEndPoint: boolean;
  method: METHOD;
  uri: string;
}

export type METHOD = "POST" | "GET";

export interface CreateApi extends BaseRequest {
  createApis: ApiUri[];
}

export interface ArchiveApi extends BaseRequest {
  apiIds: number[];
}

export interface UpdateApi extends BaseRequest {
  updateApis: ApiUri[];
}

export interface DeleteApi extends BaseRequest {
  applicationId: number;
}
export interface ReOpenApi extends BaseRequest {
  applicationId: number;
}
