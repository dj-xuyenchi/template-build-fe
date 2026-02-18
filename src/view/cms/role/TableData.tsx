import { TableCustom, TablePropsCustom } from "@/component/TableCustom";
import { Content } from "antd/es/layout/layout";
import { ApiUri } from "@/model/api/ApiUri";

type TableFunction = {
  config: TablePropsCustom<ApiUri>;
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
