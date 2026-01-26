import { InputCustom } from "@/component/InputCustom";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { ComboAction } from "@/component/table-btn/ComboAction";
import { DeleteBtn } from "@/component/table-btn/DeleteBtn";
import { EditBtn } from "@/component/table-btn/EditBtn";
import { ViewBtn } from "@/component/table-btn/ViewBtn";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { Application } from "@/model/application/Application";
import { BaseTable } from "@/model/BasePropsTable";
import { isNotHasRole } from "@/util/checkRoleBtn";
type CallBacks = BaseTable & {
  handleDeleteRow: (row: Application) => void;
  handleSetIcon: (row: Application, value: string) => void;
  handleSetName: (row: Application, value: string) => void;
  handleSetServiceUriGateway: (row: Application, value: string) => void;
};
export const getColumns = ({
  handleDeleteRow,
  handleSetName,
  handleSetIcon,
  handleSetServiceUriGateway,
}: CallBacks) => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 100,
    render: (value: string, record: Application, index: number) => (
      <TableLabelCustom>{index + 1}</TableLabelCustom>
    ),
  },
  {
    title: "Tên ứng dụng",
    dataIndex: "applicationName",
    key: "applicationName",
    width: 200,
    render: (value: string, record: Application, index: number) => (
      <InputCustom
        disabled={true}
        defaultValue={record.applicationName}
        onBlur={(e) => {
          handleSetName(record, e.target.value);
        }}
      />
    ),
  },
  {
    title: "Gateway uri điều hướng",
    dataIndex: "serviceUriGateway",
    key: "serviceUriGateway",
    width: 200,
    render: (value: string, record: Application, index: number) => (
      <InputCustom
        disabled={true}
        defaultValue={record.serviceUriGateway}
        onBlur={(e) => {
          handleSetServiceUriGateway(record, e.target.value);
        }}
      />
    ),
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (value: string, record: Application, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      >
        <ViewBtn
          disable={isNotHasRole("VIEW-APPLICATION")}
          handleView={() => {}}
        />
        <EditBtn
          disable={isNotHasRole("EDIT-APPLICATION")}
          handleEdit={() => {}}
        />
        <DeleteBtn
          disable={isNotHasRole("DELETE-APPLICATION")}
          handleDelete={() => {
            handleDeleteRow(record);
          }}
        />
        <ArchiveBtn
          disable={isNotHasRole("ARCHIVE-APPLICATION")}
          handleArchive={() => {}}
        />
      </div>
    ),
  },
  {
    title: "Thao tác",
    dataIndex: "action2",
    key: "actio2",
    width: 120,
    render: (value: string, record: Application, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      >
        <ComboAction
          handleView={() => {}}
          handleDelete={() => {
            handleDeleteRow(record);
          }}
          handleEdit={() => {}}
          handleArchive={() => {}}
          disableArchive={isNotHasRole("ARCHIVE-APPLICATION")}
          disableView={isNotHasRole("VIEW-APPLICATION")}
          disableDelete={isNotHasRole("DELETE-APPLICATION")}
          disableEdit={isNotHasRole("EDIT-APPLICATION")}
        />
      </div>
    ),
  },
];

export const getColumnsEdit = ({
  handleDeleteRow,
  handleSetName,
  handleSetIcon,
  handleSetServiceUriGateway,
}: CallBacks) => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 100,
    render: (value: string, record: Application, index: number) => (
      <TableLabelCustom>{index + 1}</TableLabelCustom>
    ),
  },
  {
    title: "Tên ứng dụng",
    dataIndex: "applicationName",
    key: "applicationName",
    width: 200,
    render: (value: string, record: Application, index: number) => (
      <InputCustom
        defaultValue={record.applicationName}
        onBlur={(e) => {
          handleSetName(record, e.target.value);
        }}
      />
    ),
  },
  {
    title: "Gateway uri điều hướng",
    dataIndex: "serviceUriGateway",
    key: "serviceUriGateway",
    width: 200,
    render: (value: string, record: Application, index: number) => (
      <InputCustom
        disabled={true}
        defaultValue={record.serviceUriGateway}
        onBlur={(e) => {
          handleSetServiceUriGateway(record, e.target.value);
        }}
      />
    ),
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (value: string, record: Application, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      >
        <ViewBtn
          disable={isNotHasRole("VIEW-APPLICATION")}
          handleView={() => {}}
        />
        <EditBtn
          disable={isNotHasRole("EDIT-APPLICATION")}
          handleEdit={() => {}}
        />
        <DeleteBtn
          disable={isNotHasRole("DELETE-APPLICATION")}
          handleDelete={() => {
            handleDeleteRow(record);
          }}
        />
        <ArchiveBtn
          disable={isNotHasRole("ARCHIVE-APPLICATION")}
          handleArchive={() => {}}
        />
      </div>
    ),
  },
  {
    title: "Thao tác",
    dataIndex: "action2",
    key: "actio2",
    width: 120,
    render: (value: string, record: Application, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      >
        <ComboAction
          handleView={() => {}}
          handleDelete={() => {
            handleDeleteRow(record);
          }}
          handleEdit={() => {}}
          handleArchive={() => {}}
          disableArchive={isNotHasRole("ARCHIVE-APPLICATION")}
          disableView={isNotHasRole("VIEW-APPLICATION")}
          disableDelete={isNotHasRole("DELETE-APPLICATION")}
          disableEdit={isNotHasRole("EDIT-APPLICATION")}
        />
      </div>
    ),
  },
];
