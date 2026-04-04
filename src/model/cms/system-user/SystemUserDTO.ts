import { BaseDataTable } from "@/model/BaseDataTable";

export interface SystemUserDTO extends BaseDataTable {
  userId: number;
  userName: string;
  password: string;
  code: string;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  maker: string;
  updatedAt: string;
  updatedBy: string;
  status: string;
  createdByChannel: string;
}

export const USER_ACTIVE = "ACTIVE";
export const USER_IN_ACTIVE = "IN_ACTIVE";
