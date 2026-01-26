
import { Checkbox } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";

export interface CheckBoxGroupPropsCustom extends CheckboxGroupProps {
}

export const CheckBoxGroupCustom = ({ ...restProps }: CheckBoxGroupPropsCustom) => {
    return (
        <Checkbox.Group  {...restProps} />
    );
};
