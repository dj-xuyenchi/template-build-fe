import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { isNotHasRole } from "@/util/checkRoleBtn";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { formatDate } from "@/util/dateUtil";
import { DATE_TYPE1 } from "@/constant/dateFormat";
import {
  getMethodLabel,
  getMethodTag,
  getStatusLabel,
  getStatusTag,
  methodSelect,
} from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { ApiUri, METHOD } from "@/model/api/ApiUri";
import { TextAreaCustom } from "@/component/TextAreaCustom";
import { Application } from "@/model/application/Application";
import { ACTIVE, CLOSE } from "@/model/BaseDataTable";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
export type CallBacks = BaseTable & {
  handleDeleteRow: (row: ApiUri) => Promise<void>;
  handleReopenRow?: (row: ApiUri) => Promise<void>;
  handleSetName: (row: ApiUri, value: string) => void;
  handleSetDescription: (row: ApiUri, value: string) => void;
  handleSetApplication: (row: ApiUri, value: number) => void;
  handleSetAction: (row: ApiUri, value: string) => void;
  handleSetUri: (row: ApiUri, value: string) => void;
  handleSetIsWhiteEndPoint: (row: ApiUri, value: boolean) => void;
  handleSetMethod: (row: ApiUri, value: METHOD) => void;
  applicationList: Application[];
};

export const getColumns = ({
  handleDeleteRow,
  handleReopenRow,
}: CallBacks): ColumnTypeCustom<ApiUri>[] => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 80,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{index + 1}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Tên api",
      dataIndex: "apiName",
      key: "apiName",
      width: 240,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Mô tả api",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Action API",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ứng dụng",
      dataIndex: "applicationName",
      key: "applicationName",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Uri Endpoint",
      dataIndex: "uri",
      key: "uri",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom align="left">{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>
          <TagCustom type={getMethodTag(value)}>
            {getMethodLabel(value)}
          </TagCustom>
        </TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Yêu cầu quyền",
      dataIndex: "isWhiteEndPoint",
      key: "isWhiteEndPoint",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>
          {value == "true" ? "Không yêu cầu" : "Yêu cầu quyền"}
        </TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 220,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>
          <TagCustom type={getStatusTag(value)}>
            {getStatusLabel(value)}
          </TagCustom>
        </TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 160,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
      render: (value: Date, record: ApiUri, index: number) => (
        <TableLabelCustom>{formatDate(value, DATE_TYPE1)}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 160,
      render: (value: Date, record: ApiUri, index: number) => (
        <TableLabelCustom>{formatDate(value, DATE_TYPE1)}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (value: string, record: ApiUri, index: number) => (
        <div
          style={{
            padding: "8px 11px",
          }}
        >
          {record.status === ACTIVE && (
            <ArchiveBtn
              disable={isNotHasRole("ARCHIVE-APPLICATION")}
              handleArchive={() => {
                handleDeleteRow(record);
              }}
            />
          )}
          {record.status === CLOSE && (
            <ReOpenBtn
              disable={isNotHasRole("ARCHIVE-APPLICATION")}
              handleReopen={() => {
                if (handleReopenRow) {
                  handleReopenRow(record);
                }
              }}
            />
          )}
        </div>
      ),
      align: "center",
    },
  ];

export const getColumnsEdit = ({
  handleSetName,
  handleSetDescription,
  handleSetApplication,
  handleSetAction,
  handleSetUri,
  handleSetIsWhiteEndPoint,
  handleSetMethod,
  applicationList,
}: CallBacks) => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 80,
      render: (value: string, record: ApiUri, index: number) => (
        <TableLabelCustom>{index + 1}</TableLabelCustom>
      ), 
      align: "center",
    },
    {
      title: "Tên api",
      dataIndex: "apiName",
      key: "apiName",
      width: 240,
      render: (value: string, record: ApiUri, index: number) => (
        <InputCustom
          defaultValue={record.apiName}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetName(record, value);
          }}
        />
      ),
    },
    {
      title: "Mô tả api",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <TextAreaCustom
          rows={1}
          defaultValue={value}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetDescription(record, value);
          }}
        />
      ),
    },
    {
      title: "Action API",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <InputCustom
          defaultValue={value}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetAction(record, value);
          }}
        />
      ),
    },
    {
      title: "Ứng dụng",
      dataIndex: "applicationId",
      key: "applicationId",
      width: 180,
      render: (value: string, record: ApiUri, index: number) => (
        <SelectCustom
          size="small"
          defaultValue={record.applicationId}
          options={applicationList.map((item) => {
            return {
              value: item.applicationId,
              label: item.applicationName,
            };
          })}
          onChange={(e) => {
            const value = e;
            handleSetApplication(record, value);
          }}
        />
      ),
    },
    {
      title: "Uri Endpoint",
      dataIndex: "uri",
      key: "uri",
      width: 200,
      render: (value: string, record: ApiUri, index: number) => (
        <InputCustom
          defaultValue={value}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetUri(record, value);
          }}
        />
      ),
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      width: 180,
      render: (value: string, record: ApiUri, index: number) => (
        <SelectCustom
          size="small"
          defaultValue={record.method}
          options={methodSelect
            .filter((item) => {
              return !item.filter;
            })
            .map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
          onChange={(e) => {
            const value = e;
            handleSetMethod(record, value);
          }}
        />
      ),
    },
    {
      title: "Yêu cầu quyền",
      dataIndex: "isWhiteEndPoint",
      key: "isWhiteEndPoint",
      width: 180,
      render: (value: string, record: ApiUri, index: number) => (
        <SelectCustom
          size="small"
          defaultValue={record.isWhiteEndPoint}
          options={[
            {
              value: "true",
              label: "Không yêu cầu quyền",
            },
            {
              value: "false",
              label: "Yêu cầu quyền",
            },
          ]}
          onChange={(e) => {
            const value = e;
            handleSetIsWhiteEndPoint(record, value == "true" ? true : false);
          }}
        />
      ),
    },
  ];
