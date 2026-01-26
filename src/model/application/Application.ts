import { BaseDataTable } from "../BaseDataTable";
import { BaseRequest } from "../BaseRequest";

export interface Application extends BaseDataTable {
  applicationId: number;
  applicationIcon: string;
  applicationName: string;
  serviceUriGateway: string;
}

export interface CreateApplication extends BaseRequest {
  createApplications: Application[];
}

export interface DeleteApplication extends BaseRequest {
  applicationIds: number[];
}

export interface UpdateApplication extends BaseRequest {
  updateApplication: Application[];
}
