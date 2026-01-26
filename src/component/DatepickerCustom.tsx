import { DatePicker, DatePickerProps } from "antd";
import "@/config/styleOverride.css";
export interface DatePickerPropsCustom extends DatePickerProps {
}

export const DatePickerCustom = ({ ...restProps }: DatePickerPropsCustom) => {
    return (
        <DatePicker className="picker-custom"
            {...restProps} />
    );
};


