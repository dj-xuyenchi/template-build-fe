import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseResponse } from "@/model/BaseResponse";
import { GlobalConfig } from "@/model/global-config/GlobalConfig";

export interface GetGlobalConfigRequest {
  globalConfigCode: string;
  isTakeGlobalConfigData?: boolean;
}
export const globalConfigApi = {
  getGlobalConfig: async (
    params: GetGlobalConfigRequest,
    signal?: AbortSignal,
  ): Promise<BaseResponse<GlobalConfig>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/global-config/get-global-config`,
      {
        params: params,
        signal: signal,
      },
    );
    return res.data;
  },
};
