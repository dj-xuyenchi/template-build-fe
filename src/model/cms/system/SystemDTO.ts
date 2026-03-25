import { BaseDataTable } from "@/model/BaseDataTable";

export interface SystemDTO extends BaseDataTable {
  systemId: number;
  systemCode: string;
  systemName: string;
  systemUriGateway: string;
  status: string;
  maker: string;
  updatedBy: string;
}

export const SYSTEM_ACTIVE = "ACTIVE";
export const SYSTEM_IN_ACTIVE = "IN_ACTIVE";
