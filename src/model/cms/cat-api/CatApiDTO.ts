import { BaseDataTable } from "@/model/BaseDataTable";

export interface CatApiDTO extends BaseDataTable {
  apiId: string;
  apiCode: string;
  apiName: string;
  apiDescription: string;
  uri: string;
  systemId: string;
  method: string;
  maker: string;
  updatedBy: string;
  isWhiteEndPoint: string;
  status: string;
}
