import { DatePicker, DatePickerProps } from "antd";

export interface DatePickerPropsCustom extends DatePickerProps {}

export const DatePickerCustom = ({ ...restProps }: DatePickerPropsCustom) => {
  return <DatePicker className="picker-custom" {...restProps} />;
};
