import "@/config/styleOverride.css";
import TextArea, { TextAreaProps } from "antd/es/input/TextArea";
export interface TextAreaPropsCustom extends TextAreaProps {
}

export const TextAreaCustom = ({  ...restProps }: TextAreaPropsCustom) => {
    return (
        <TextArea   {...restProps} />
    );
};


