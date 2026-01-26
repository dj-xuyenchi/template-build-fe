import { BaseDataTable } from "../BaseDataTable";
import { BaseRequest } from "../BaseRequest";

export interface Function extends BaseDataTable {
    functionId: number;
    functionName: string;
    createdBy: Date;
    effectFrom?: Date | string;
    effectTo?: Date | string;
    effectType: string;
    functionIcon: string;
    parentId?: number;
    status: string;
    type?: string;
    updatedAt?: Date;
    updatedBy?: string;
    functionCode: string;
}

export interface CreateFunction extends BaseRequest {
    createFunctions: Function[]
}

export interface ArchiveFunction extends BaseRequest {
    functionIds: number[]
}

export interface UpdateFunction extends BaseRequest {
    updateFunction: Function[]
}