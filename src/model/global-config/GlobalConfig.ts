import { GlobalConfigData } from "./GlobalConfigData";

export interface GlobalConfig {
  globalConfigId: number;
  globalConfigName: string;
  globalConfigDescription: string;
  globalConfigCode: string;
  globalConfigValue: string;
  status: string;
  createdAt: string;
  maker: string;
  updatedAt: string;
  updatedBy: string;
  globalConfigData: GlobalConfigData[];
}
