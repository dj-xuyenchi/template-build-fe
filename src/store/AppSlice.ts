export interface AppSlice {
  optionFeatures: OptionFeature[];
  callBack: (paramsString?: string) => void;
}

export interface OptionFeature {
  label: string;
  value: string;
}
