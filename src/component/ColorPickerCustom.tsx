import { ColorPickerProps, ColorPicker } from "antd";
import "@/config/styleOverride.css";
export interface ColorPickerPropsCustom extends ColorPickerProps {
}

export const ColorPickerCustom = ({ ...restProps }: ColorPickerPropsCustom) => {

    return (
        <ColorPicker  {...restProps} defaultValue="#1677ff" showText allowClear />
    );
};


