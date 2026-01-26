import "@/config/styleOverride.css";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DatePicker;
export interface DateRangePickerPropsCustom extends RangePickerProps {
}

export const DateRangePickerCustom = ({ ...restProps }: DateRangePickerPropsCustom) => {
    return (
        <RangePicker  {...restProps} />
    );
};


