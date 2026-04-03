import { TableCustom, TablePropsCustom } from "@/component/TableCustom";
import { BtnDTO } from "@/model/cms/btn/ButtonDTO";
import { Content } from "antd/es/layout/layout";

type TableFunction = {
  config: TablePropsCustom<BtnDTO>;
};
export const TableData = ({ config }: TableFunction) => {
  return (
    <>
      <Content
        style={{
          padding: "0px 24px 12px 24px",
          margin: "12px 0px 0px 0px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <TableCustom fixedCollap={true} {...config} />
      </Content>
    </>
  );
};
