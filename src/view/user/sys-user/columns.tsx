import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { formatDateWithDayVN } from "@/util/date/dateUtil";
import { getStatusLabel, getStatusTag } from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { InputCustom } from "@/component/InputCustom";
import { TextAreaCustom } from "@/component/TextAreaCustom";

import { BTN_ACTIVE, BTN_IN_ACTIVE } from "@/model/cms/btn/ButtonDTO";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { SystemUserDTO } from "@/model/cms/system-user/SystemUserDTO";

export type CallBacks = BaseTable & {
  systemList: { label: string; value: number }[];
};

export const getColumns =
  ({}: CallBacks): ColumnTypeCustom<SystemUserDTO>[] => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 80,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "User name",
      dataIndex: "userName",
      key: "userName",
      width: 200,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ảnhh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      width: 200,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Mã code NV",
      dataIndex: "code",
      key: "code",
      width: 200,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "fullName",
      key: "fullName",
      width: 260,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 220,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "maker",
      key: "maker",
      width: 160,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Kênh tạo",
      dataIndex: "createdByChannel",
      key: "createdByChannel",
      width: 160,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (value: Date, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: SystemUserDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 200,
      render: (value: Date, record: SystemUserDTO, index: number) => (
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
      render: (value: string, record: SystemUserDTO, index: number) => (
        <div
          style={{
            padding: "8px 11px",
          }}
        >
          {record.status === BTN_ACTIVE && (
            <ArchiveBtn
              disable={!allowBtnCode("ARCHIVE_ROLE")}
              handleArchive={() => {
                handleInactiveActiveRow(record);
              }}
            />
          )}
          {record.status === BTN_IN_ACTIVE && (
            <ReOpenBtn
              disable={!allowBtnCode("ACTIVE_ROLE")}
              handleReopen={() => {
                handleInactiveActiveRow(record);
              }}
            />
          )}
        </div>
      ),
      align: "center",
    },
  ];

export const getColumnsEdit = ({
  handleSetBtnName,
  handleSetBtnCode,
  handleSetBtnDescription,
  systemList,
}: CallBacks) => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    align: "center",
    width: 80,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{index + 1}</TableLabelCustom>
    ),
  },
  {
    title: "Tên nút",
    dataIndex: "btnName",
    key: "btnName",
    width: 200,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <InputCustom
        defaultValue={record.btnName}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetBtnName(record, value);
        }}
      />
    ),
    align: "center",
  },
  {
    title: "Mã code nút",
    dataIndex: "btnCode",
    key: "btnCode",
    width: 200,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <InputCustom
        disabled={!record.isNewRow}
        defaultValue={record.btnCode}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetBtnCode(record, value);
        }}
      />
    ),
    align: "center",
  },
  {
    title: "Mô tả nút",
    dataIndex: "btnDescription",
    key: "btnDescription",
    width: 260,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TextAreaCustom
        rows={1}
        defaultValue={record.btnDescription}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetBtnDescription(record, value);
        }}
      />
    ),
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 220,
    render: (value: string, record: SystemUserDTO, index: number) => (
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
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
    render: (value: Date, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 200,
    render: (value: Date, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
];
