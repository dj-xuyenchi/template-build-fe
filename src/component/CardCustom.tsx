import { Card, CardProps } from "antd";

export interface CardCustomProps extends CardProps {}

export const CardCustom = ({ children, ...restProps }: CardCustomProps) => {
  return <Card {...restProps}>{children}</Card>;
};
