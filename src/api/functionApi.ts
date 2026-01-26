import axiosClient from "@/config/httpCall";
import { AUTH_SERVICE } from "@/constant/serviceUrl";
import {
    Application,
    UpdateApplication,
} from "@/model/application/Application";
import { BaseFilter } from "@/model/BaseFilter";
import { BasePageResult } from "@/model/BasePageResult";
import { ArchiveFunction, CreateFunction, Function } from "@/model/function/Function";
import dayjs from "dayjs";
export interface FunctionFilter extends BaseFilter {
    functionName?: string;
    effectType?: string;
    effectFrom?: Date | dayjs.Dayjs | string | null;
    effectTo?: Date | dayjs.Dayjs | string | null;
    status?: string[];
}
export const functionApi = {
    getFunctionByFilter: async (
        requestParams: FunctionFilter,
        signal: AbortSignal
    ): Promise<BasePageResult<Function>> => {
        const res = await axiosClient.get(`${AUTH_SERVICE}/function`, {
            params: requestParams,
            signal: signal,
        });
        return res.data;
    },
    create: async (
        requestBody: CreateFunction
    ): Promise<Function[]> => {
        const res = await axiosClient.post(
            `${AUTH_SERVICE}/function/create`,
            requestBody
        );
        return res.data;
    },
    archive: async (
        requestBody: ArchiveFunction
    ): Promise<Application[]> => {
        const res = await axiosClient.post(
            `${AUTH_SERVICE}/application/archive`,
            requestBody
        );
        return res.data;
    },
    update: async (
        requestBody: UpdateApplication
    ): Promise<Application[]> => {
        const res = await axiosClient.post(
            `${AUTH_SERVICE}/application/update`,
            requestBody
        );
        return res.data;
    },
};
