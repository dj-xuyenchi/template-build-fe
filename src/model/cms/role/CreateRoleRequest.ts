
export interface CreateRoleRequest {
    data: CreateRoleRequestData[]
}

export interface CreateRoleRequestData {
    roleCode: string;
    roleName: string;
    roleDescription: string;
    effectiveType: string;
    effectiveFrom: string;
    effectiveTo: string;
    status: string;
}