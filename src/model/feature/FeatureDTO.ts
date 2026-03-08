import { BaseDataTable } from "../BaseDataTable";

export interface FeatureDTO extends BaseDataTable {
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
export const FEATURE_ACTIVE = "ACTIVE";
export const FEATURE_ARCHIVE = "AR_CHIVE";
