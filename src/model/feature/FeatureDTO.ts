export interface FeatureDTO {
    featureId: number;
    featureCode: string;
    featureName: string;
    parentId: number;
    systemId: number;
    menuLevel: number;
    effectiveType: string;
    effectiveFrom: string;
    effectiveTo: string;
    createdAt: string;
    maker: string;
    updatedBy: string;
    updatedAt: string;
    status: string
    icon: string;
    feLabel: string;
    feUri: string;
}