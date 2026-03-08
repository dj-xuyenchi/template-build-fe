export interface AuditFeatureRequest {
  create: CreateFeatureRequestData[];
  update: UpdateFeatureRequestData[];
}

export interface CreateFeatureRequestData {
  featureCode: string;
  featureName: string;
  parentId: number;
  systemId: number;
  menuLevel: number;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
  maker: string;
  updatedBy: string;
  updatedAt: string;
  status: string;
  icon: string;
  feLabel: string;
  feUri: string;
  isSubMenu?: boolean;
  isMenu: boolean;
  sortNumber?: number;
  parentFeatureName?: string;
  systemName: string;
}
export interface UpdateFeatureRequestData {
  featureId: number;
  featureCode: string;
  featureName: string;
  parentId: number;
  systemId: number;
  menuLevel: number;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
  maker: string;
  updatedBy: string;
  updatedAt: string;
  status: string;
  icon: string;
  feLabel: string;
  feUri: string;
  isSubMenu?: boolean;
  isMenu: boolean;
  sortNumber?: number;
  parentFeatureName?: string;
  systemName: string;
}

export interface ArchiveActiveRequest {
  id: number;
}
