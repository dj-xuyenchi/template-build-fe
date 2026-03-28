import { BaseDataTable } from "@/model/BaseDataTable";

export interface CatApiDTO extends BaseDataTable {
  apiId: string;
  apiCode: string;
  apiName: string;
  apiDescription: string;
  uri: string;
  systemId: string;
  systemName: string;
  method: string;
  maker: string;
  updatedBy: string;
  isWhiteEndPoint: string;
  status: string;
}


export const API_ACTIVE = "ACTIVE";
export const API_INACTIVE = "IN_ACTIVE";