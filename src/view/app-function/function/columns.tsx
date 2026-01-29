import { DatePickerCustom } from "@/component/DatepickerCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { Function } from "@/model/function/Function";
import dayjs from "dayjs";
import { isNotHasRole } from "@/util/checkRoleBtn";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { formatDate } from "@/util/dateUtil";
import { DATE_TYPE1 } from "@/constant/dateFormat";
import {
  effectTypeSelect,
  getEffectTypeLabel,
  getStatusLabel,
  getStatusTag,
} from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ButtonCustom } from "@/component/ButtonCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { ExpandColumnBtnPopver } from "@/component/table-btn/ExpandColumnBtnPopver";
type CallBacks = BaseTable & {
  handleDeleteRow: (row: Function) => void;
  handleSetIcon: (row: Function, value: string) => void;
  handleSetName: (row: Function, value: string) => void;
  handleSetFunctionCode: (row: Function, value: string) => void;
  handleSetEffectType: (row: Function, value: string) => void;
  handleSetEffectFrom: (row: Function, value: dayjs.Dayjs) => void;
  handleSetEffectTo: (row: Function, value: dayjs.Dayjs) => void;
};
export const getColumns = ({
  handleDeleteRow,
  handleExpandHeader,
  expandedCols,
}: CallBacks): ColumnTypeCustom<Function>[] => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 80,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{index + 1}</TableLabelCustom>
      ),
      align: "center",
      onHeaderCell: () => {
        return {
          className: "red-head white-text-head",
        };
      },
    },
    {
      title: "Tên chức năng",
      dataIndex: "functionName",
      key: "functionName",
      width: 240,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "left",
      onHeaderCell: () => {
        return {
          className: "orange-head white-text-head",
        };
      },
    },
    {
      title: (
        <div>
          <span>Mã chức năng</span>
          <ExpandColumnBtnPopver
            columnList={[
              { columnIndexName: "hi1", columnName: "hi1" },
              { columnIndexName: "hi2", columnName: "hi2" },
              { columnIndexName: "hi3", columnName: "hi3" },
              { columnIndexName: "hi4", columnName: "hi4" },
              { columnIndexName: "hi5", columnName: "hi5" },
              { columnIndexName: "hi6", columnName: "hi6" },
              { columnIndexName: "hi7", columnName: "hi7" },
            ]}
            title="Chọn tháng cần xem"
            handleExpandColumns={
              handleExpandHeader as (keys: string[], toCol: string) => void
            }
            toCol="hi7"
            backCol="hi1"
          />
        </div>
      ),
      dataIndex: "functionCode",
      key: "functionCode",
      width: 200,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "left",
      onHeaderCell: () => {
        return {
          className: "blue-head white-text-head",
        };
      },
    },
    {
      title: "hi1",
      dataIndex: "hi1",
      key: "hi1",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>hi1</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "hi2",
      dataIndex: "hi2",
      key: "hi2",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>hi1</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "hi3",
      dataIndex: "hi3",
      key: "hi3",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>hi1</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "hi4",
      dataIndex: "hi4",
      key: "hi4",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>hi1</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "hi5",
      dataIndex: "hi5",
      key: "hi5",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>hi1</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "hi6",
      dataIndex: "hi6",
      key: "hi6",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>hi1</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "hi7",
      dataIndex: "hi7",
      key: "hi7",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>hi1</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: (
        <div>
          <span>Biểu tượng</span>
          <ButtonCustom
            size="small"
            style={{
              marginLeft: "12px",
              borderRadius: "3px",
              height: 18,
              width: 18,
            }}
            onClick={() => {
              if (handleExpandHeader) {
                if (expandedCols?.["functionIcon"]) {
                  handleExpandHeader(["functionIcon"], "hi1");
                } else {
                  handleExpandHeader(["functionIcon"], "effectType");
                }
              }
            }}
            icon={expandedCols?.["functionIcon"] ? <FiMinus /> : <FiPlus />}
          ></ButtonCustom>
        </div>
      ),
      dataIndex: "functionIcon",
      key: "functionIcon",
      width: 200,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
      onHeaderCell: () => {
        return {
          className: "green-head white-text-head",
        };
      },
      children: [
        {
          title: "Người tạo",
          dataIndex: "createdBy",
          key: "createdBy",
          width: 160,
          render: (value: string, record: Function, index: number) => (
            <TableLabelCustom>{value}</TableLabelCustom>
          ),
          align: "left",
        },
        {
          title: "Người cập nhật",
          dataIndex: "updatedBy",
          key: "updatedBy",
          width: 160,
          render: (value: string, record: Function, index: number) => (
            <TableLabelCustom>{value}</TableLabelCustom>
          ),
          align: "left",
        },
      ],
    },
    {
      title: "Children",
      dataIndex: "effectType",
      key: "effectType",
      width: 200,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{getEffectTypeLabel(value)}</TableLabelCustom>
      ),
      align: "center",
      onHeaderCell: () => {
        return {
          className: "yellow-head white-text-head",
        };
      },
      children: [
        {
          title: "Kiểu hiệu lực",
          dataIndex: "effectType",
          key: "effectType",
          width: 200,
          render: (value: string, record: Function, index: number) => (
            <TableLabelCustom>{getEffectTypeLabel(value)}</TableLabelCustom>
          ),
          align: "center",
          onHeaderCell: () => {
            return {
              className: "blue-head white-text-head",
            };
          },
        },
        {
          title: "Hiệu lực từ",
          dataIndex: "effectFrom",
          key: "effectFrom",
          width: 220,
          render: (value: Date, record: Function, index: number) => (
            <TableLabelCustom>{formatDate(value, DATE_TYPE1)}</TableLabelCustom>
          ),
          align: "center",
          onHeaderCell: () => {
            return {
              className: "red-head black-text-head",
            };
          },
        },
      ],
    },

    {
      title: "Hiệu lực đến",
      dataIndex: "effectTo",
      key: "effectTo",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>{formatDate(value, DATE_TYPE1)}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 220,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>
          <TagCustom type={getStatusTag(value)}>
            {getStatusLabel(value)}
          </TagCustom>
        </TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
      render: (value: Date, record: Function, index: number) => (
        <TableLabelCustom>{formatDate(value, DATE_TYPE1)}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 160,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "left",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "left",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy3",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "left",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy4",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "left",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy5",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "left",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (value: string, record: Function, index: number) => (
        <div
          style={{
            padding: "8px 11px",
          }}
        >
          <ArchiveBtn
            disable={isNotHasRole("ARCHIVE-APPLICATION")}
            handleArchive={() => { }}
          />
        </div>
      ),
      align: "center",
    },
  ];

export const getColumnsEdit = ({
  handleDeleteRow,
  handleSetName,
  handleSetIcon,
  handleSetFunctionCode,
  handleSetEffectType,
  handleSetEffectFrom,
  handleSetEffectTo,
}: CallBacks) => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 80,
      render: (value: string, record: Function, index: number) => (
        <TableLabelCustom>{index + 1}</TableLabelCustom>
      ),
    },
    {
      title: "Tên chức năng",
      dataIndex: "functionName",
      key: "functionName",
      width: 240,
      render: (value: string, record: Function, index: number) => (
        <InputCustom
          defaultValue={record.functionName}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetName(record, value);
          }}
        />
      ),
    },
    {
      title: "Mã chức năng",
      dataIndex: "functionCode",
      key: "functionCode",
      width: 200,
      render: (value: string, record: Function, index: number) => (
        <InputCustom
          defaultValue={value}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetFunctionCode(record, value);
          }}
        />
      ),
    },
    {
      title: "Biểu tượng",
      dataIndex: "functionIcon",
      key: "functionIcon2",
      width: 200,
      render: (value: string, record: Function, index: number) => (
        <InputCustom
          defaultValue={record.functionIcon}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetIcon(record, value);
          }}
        />
      ),
    },
    {
      title: "Kiểu hiệu lực",
      dataIndex: "effectType",
      key: "effectType",
      width: 180,
      render: (value: string, record: Function, index: number) => (
        <SelectCustom
          defaultValue={record.effectType}
          options={effectTypeSelect?.filter((type) => {
            return type.value !== "NE,E";
          })}
          onChange={(e) => {
            const value = e;
            handleSetEffectType(record, value);
          }}
        />
      ),
    },
    {
      title: "Hiệu lực từ",
      dataIndex: "effectFrom",
      key: "effectFrom",
      width: 220,
      render: (value: Date, record: Function, index: number) => (
        <DatePickerCustom
          defaultValue={value ? dayjs(value) : null}
          onChange={(e) => {
            handleSetEffectFrom(record, e as dayjs.Dayjs);
          }}
        />
      ),
    },
    {
      title: "Hiệu lực đến",
      dataIndex: "effectTo",
      key: "effectTo",
      width: 220,
      render: (value: string, record: Function, index: number) => (
        <DatePickerCustom
          defaultValue={value ? dayjs(value) : null}
          onChange={(e) => {
            handleSetEffectTo(record, e as dayjs.Dayjs);
          }}
        />
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: 120,
      fixed: "right",
      render: (value: string, record: Function, index: number) => (
        <div
          style={{
            padding: "8px 11px",
          }}
        >
          <ArchiveBtn
            disable={isNotHasRole("ARCHIVE-APPLICATION")}
            handleArchive={() => { }}
          />
        </div>
      ),
    },
  ];
