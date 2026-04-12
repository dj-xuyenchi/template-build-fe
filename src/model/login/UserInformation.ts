import { FeatureDTO } from "../cms/feature/FeatureDTO";

export interface UserInformation {
  userId: number;
  userName: string;
  fullName: string;
  avatar: string;
  status: string;
  roleCodes: string;
  roles: string[];
  allowBtnCodes: string;
  btnCodes: string[];
  allowFeatureCode: string;
  features: FeatureDTO[];
}
