import { BaseFilter } from "../../BaseFilter";

export interface GetFeatureRequest extends BaseFilter {
  isTakeRoleApply?: boolean;
}
