import { Switch, SwitchProps } from "antd";
import "@/config/styleOverride.css";
export interface SwitchPropsCustom extends SwitchProps {
}

export const SwitchCustom = ({ ...restProps }: SwitchPropsCustom) => {
    return (
        <Switch   {...restProps} />
    );
};


