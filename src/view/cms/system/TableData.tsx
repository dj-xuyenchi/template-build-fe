import { TableCustom, TablePropsCustom } from "@/component/TableCustom";
import { SystemDTO } from "@/model/cms/system/SystemDTO";
import { Content } from "antd/es/layout/layout";

type TableFunction = {
  config: TablePropsCustom<SystemDTO>;
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
        <TableCustom
          fixedCollap={true}
          {...config}
        />
      </Content>
    </>
  );
};
