import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import {
  Application,
  CreateApplication,
  DeleteApplication,
  UpdateApplication,
} from "@/model/application/Application";
import { BaseFilter } from "@/model/BaseFilter";
import { BasePageResult } from "@/model/BasePageResult";
export interface ApplicationFilter extends BaseFilter {
  applicationName?: string;
  status?: string[];
}
export const applicationApi = {
  getApplicationByFilter: async (
    requestParams: ApplicationFilter,
    signal?: AbortSignal
  ): Promise<BasePageResult<Application>> => {
    const res = await axiosClient.get(`${AUTHEN_SERVICE}/application`, {
      params: requestParams,
      signal: signal,
    });
    return res.data;
  },
  createApplication: async (
    requestBody: CreateApplication
  ): Promise<Application[]> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/application/create`,
      requestBody
    );
    return res.data;
  },
  deleteApplication: async (
    requestBody: DeleteApplication
  ): Promise<Application[]> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/application/archive`,
      requestBody
    );
    return res.data;
  },
  updateApplication: async (
    requestBody: UpdateApplication
  ): Promise<Application[]> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/application/update`,
      requestBody
    );
    return res.data;
  },
};
