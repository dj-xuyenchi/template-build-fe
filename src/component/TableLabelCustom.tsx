import "@/config/styleOverride.css";
export interface TableLabelPropsCustom {
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
}

export const TableLabelCustom = ({
  align,
  ...restProps
}: TableLabelPropsCustom) => {
  return (
    <p
      style={{
        padding: "4px 11px",
        textAlign: align,
      }}
      {...restProps}
    ></p>
  );
};
