import { FeatureDTO } from "../feature/FeatureDTO";

export interface GlobalSystemConfig {
    features: FeatureDTO[];
    uiPushCode: Map<string, string>;
}
