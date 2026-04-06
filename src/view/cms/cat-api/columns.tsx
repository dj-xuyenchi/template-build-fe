import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { formatDateWithDayVN } from "@/util/date/dateUtil";
import { getStatusLabel, getStatusTag, methodSelect } from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import {
  API_ACTIVE,
  API_INACTIVE,
  CatApiDTO,
} from "@/model/cms/cat-api/CatApiDTO";
import { InputCustom } from "@/component/InputCustom";
import { TextAreaCustom } from "@/component/TextAreaCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { SwitchCustom } from "@/component/SwitchCustom";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";

export type CallBacks = BaseTable & {
  handleSetApiName: (row: CatApiDTO, value: string) => void;
  handleSetApiCode: (row: CatApiDTO, value: string) => void;
  handleSetApiDescription: (row: CatApiDTO, value: string) => void;
  handleSetSystemId: (row: CatApiDTO, value: number) => void;
  handleSetIsWhiteEndPoint: (row: CatApiDTO, value: boolean) => void;
  handleSetMethod: (row: CatApiDTO, value: string) => void;
  handleSetUri: (row: CatApiDTO, value: string) => void;
  handleInactiveRow: (row: CatApiDTO) => void;
  handleActiveRow: (row: CatApiDTO) => void;
  systemList: { label: string; value: number }[];
};

export const getColumns = ({
  handleInactiveRow,
  handleActiveRow,
}: CallBacks): ColumnTypeCustom<CatApiDTO>[] => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    width: 80,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
    ),
    align: "center",
  },

  {
    title: "Tên API",
    dataIndex: "apiName",
    key: "apiName",
    width: 200,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mã code API",
    dataIndex: "apiCode",
    key: "apiCode",
    width: 200,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mô tả API",
    dataIndex: "apiDescription",
    key: "apiDescription",
    width: 260,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "URI",
    dataIndex: "uri",
    key: "uri",
    width: 260,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom align="left">{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Hệ thống",
    dataIndex: "systemName",
    key: "systemName",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },

  {
    title: "Phương thức",
    dataIndex: "method",
    key: "method",
    width: 200,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Yêu cầu xác thực",
    dataIndex: "isWhiteEndPoint",
    key: "isWhiteEndPoint",
    width: 200,
    render: (value: boolean, record: CatApiDTO, index: number) => (
      <TagCustom color={value ? "red" : "green"}>
        {value ? "Không" : "Có"}
      </TagCustom>
    ),
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 220,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>
        <TagCustom color={getStatusTag(value)}>
          {getStatusLabel(value)}
        </TagCustom>
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người tạo",
    dataIndex: "maker",
    key: "maker",
    width: 160,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
    render: (value: Date, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 200,
    render: (value: Date, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    width: 100,
    fixed: "right",
    render: (value: string, record: CatApiDTO, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      >
        {record.status === API_ACTIVE && (
          <ArchiveBtn
            disable={!allowBtnCode("ARCHIVE_ROLE")}
            handleArchive={() => {
              handleInactiveRow(record);
            }}
          />
        )}{" "}
        {record.status === API_INACTIVE && (
          <ReOpenBtn
            disable={!allowBtnCode("ACTIVE_ROLE")}
            handleReopen={() => {
              handleActiveRow(record);
            }}
          />
        )}
      </div>
    ),
    align: "center",
  },
];

export const getColumnsEdit = ({
  handleSetApiName,
  handleSetApiCode,
  handleSetApiDescription,
  handleSetSystemId,
  handleSetIsWhiteEndPoint,
  handleSetMethod,
  handleSetUri,
  handleInactiveRow,
  handleActiveRow,
  systemList,
}: CallBacks) => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    align: "center",
    width: 80,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{index + 1}</TableLabelCustom>
    ),
  },
  {
    title: "Tên API",
    dataIndex: "apiName",
    key: "apiName",
    align: "center",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <InputCustom
        defaultValue={record.apiName}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetApiName(record, value);
        }}
      />
    ),
  },
  {
    title: "Mã code API",
    dataIndex: "apiCode",
    key: "apiCode",
    align: "center",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <InputCustom
        disabled={!record.isNewRow}
        defaultValue={record.apiCode}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetApiCode(record, value);
        }}
      />
    ),
  },
  {
    title: "Mô tả API",
    dataIndex: "apiDescription",
    key: "apiDescription",
    align: "center",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TextAreaCustom
        rows={1}
        defaultValue={record.apiDescription}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetApiDescription(record, value);
        }}
      />
    ),
  },
  {
    title: "URI",
    dataIndex: "uri",
    key: "uri",
    align: "center",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <InputCustom
        defaultValue={record.uri}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetUri(record, value);
        }}
      />
    ),
  },
  {
    title: "Hệ thống",
    dataIndex: "systemId",
    key: "systemId",
    align: "center",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <SelectCustom
        size="small"
        value={record.systemId}
        options={systemList}
        onChange={(e) => {
          const value = e;
          handleSetSystemId(record, value);
        }}
      />
    ),
  },
  {
    title: "Phương thức",
    dataIndex: "method",
    key: "method",
    align: "center",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <SelectCustom
        size="small"
        value={record.method}
        options={methodSelect}
        onChange={(e) => {
          const value = e;
          handleSetMethod(record, value);
        }}
      />
    ),
  },
  {
    title: "Yêu cầu xác thực",
    dataIndex: "isWhiteEndPoint",
    key: "isWhiteEndPoint",
    align: "center",
    width: 240,
    render: (value: string, record: CatApiDTO, index: number) => (
      <>
        <SwitchCustom
          size="small"
          defaultValue={!record.isWhiteEndPoint}
          onChange={(e) => {
            handleSetIsWhiteEndPoint(record, e);
          }}
        />
      </>
    ),
  },
];
