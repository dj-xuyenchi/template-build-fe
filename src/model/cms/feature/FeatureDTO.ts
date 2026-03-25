import { BaseDataTable } from "../../BaseDataTable";
import { RoleApplyDTO } from "../roleApply/RoleApplyDTO";

export interface FeatureDTO extends BaseDataTable {
  featureId: number;
  featureCode: string;
  featureName: string;
  isErrorFeatureName?: boolean;
  isErrorFeatureCode?: boolean;
  parentId: number;
  systemId: number;
  menuLevel: number;
  effectiveType: string | undefined;
  effectiveFrom: string | undefined;
  effectiveTo: string | undefined;
  maker: string;
  updatedBy: string;
  status: string;
  icon: string;
  feUri: string;
  isErrorFeatureFeUri?: boolean;
  isSubMenu?: boolean;
  isMenu: boolean;
  sortNumber?: number;
  parentFeatureName?: string;
  systemName: string;
  roleApply: RoleApplyDTO[];

  isErrorFeatureEffectiveType?: boolean;
  isErrorFeatureEffectiveFrom?: boolean;
  isErrorFeatureEffectiveTo?: boolean;
}

export const FEATURE_ACTIVE = "ACTIVE";
export const FEATURE_ARCHIVE = "ARCHIVE";
