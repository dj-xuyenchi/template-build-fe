import { Switch, SwitchProps } from "antd";

export interface SwitchPropsCustom extends SwitchProps {}

export const SwitchCustom = ({ ...restProps }: SwitchPropsCustom) => {
  return <Switch {...restProps} />;
};
