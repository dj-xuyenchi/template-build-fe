import { BaseDataTable } from "../../BaseDataTable";

export interface BtnDTO extends BaseDataTable {
  btnId: number;
  btnCode: string;
  btnName: string;
  btnDescription: string;
  maker: string;
  updatedBy: string;
  updatedAt: string;
  status: string;
}

export const BTN_ACTIVE = "ACTIVE";
export const BTN_IN_ACTIVE = "IN_ACTIVE";
