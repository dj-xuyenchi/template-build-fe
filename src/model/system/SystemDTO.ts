import { BaseDataTable } from "../BaseDataTable";

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
