import { BaseDataTable } from "@/model/BaseDataTable";

export interface CatApiDTO extends BaseDataTable {
  apiId: number;
  apiCode: string;
  apiName: string;
  apiDescription: string;
  uri: string;
  systemId: number;
  systemName: string;
  method: string;
  maker: string;
  updatedBy: string;
  isWhiteEndPoint: boolean;
  status: string;
}

export const API_ACTIVE = "ACTIVE";
export const API_INACTIVE = "IN_ACTIVE";
