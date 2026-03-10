import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { formatDateWithDayVN } from "@/util/date/dateUtil";
import {
  effectiveType,
  getEffectiveLabel,
  getEffectiveTag,
  getStatusLabel,
  getStatusTag,
} from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { ACTIVE } from "@/model/BaseDataTable";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { SwitchCustom } from "@/component/SwitchCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import dayjs from "dayjs";
import { FeatureDTO } from "@/model/feature/FeatureDTO";
import { ROLE_ARCHIVE } from "@/model/cms/role/RoleDTO";
import { SystemDTO } from "@/model/system/SystemDTO";
import { reactIconPool } from "@/config/icon/reactIconPool";
import { getIcon } from "@/config/menu/menu";

export type CallBacks = BaseTable & {
  handleArchiveActiveRow: (row: FeatureDTO) => Promise<void>;
  handleSetFeatureName: (row: FeatureDTO, value: string) => void;
  handleSetFeatureCode: (row: FeatureDTO, value: string) => void;
  handleSetFeatureParent: (row: FeatureDTO, value: number) => void;
  handleSetSystem: (row: FeatureDTO, value: number) => void;
  handleSetEffectiveType: (row: FeatureDTO, value: string) => void;
  handleSetRoleCode: (row: FeatureDTO, value: string) => void;
  handleSetEffectiveFrom: (row: FeatureDTO, value: dayjs.Dayjs | null) => void;
  handleSetEffectiveTo: (row: FeatureDTO, value: dayjs.Dayjs | null) => void;
  handleSetStatus: (row: FeatureDTO, value: boolean) => void;
  handleSetFeUri: (row: FeatureDTO, value: string) => void;
  handleSetIsMenu: (row: FeatureDTO, value: boolean) => void;
  handleSetIsSubMenu: (row: FeatureDTO, value: boolean) => void;
  features: FeatureDTO[];
  systems: SystemDTO[];
};

export const getColumns = ({
  handleArchiveActiveRow,
}: CallBacks): ColumnTypeCustom<FeatureDTO>[] => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 80,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Tên chức năng",
      dataIndex: "featureName",
      key: "featureName",
      width: 240,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Mã chức năng",
      dataIndex: "featureCode",
      key: "featureCode",
      width: 200,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Key đường dẫn giao diện",
      dataIndex: "feUri",
      key: "feUri",
      width: 200,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="left">{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Tiêu đề hiển thị",
      dataIndex: "feLabel",
      key: "feLabel",
      width: 220,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="left">{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      width: 200,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="left">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginRight: "4px",
              }}
            >
              {getIcon(value)}
            </span>
            {value}
          </div>
        </TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Chức năng cha",
      dataIndex: "parentFeatureName",
      key: "parentFeatureName",
      width: 240,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Hệ thống",
      dataIndex: "systemName",
      key: "systemName",
      width: 240,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Kiểu áp dụng",
      dataIndex: "effectiveType",
      key: "effectiveType",
      width: 200,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TagCustom type={getEffectiveTag(value, record)}>
          {getEffectiveLabel(value)}
        </TagCustom>
      ),
      align: "center",
    },
    {
      title: "Áp dụng từ",
      dataIndex: "effectiveFrom",
      key: "effectiveFrom",
      width: 200,
      render: (value: Date, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="left">
          {formatDateWithDayVN(value, true)}
        </TableLabelCustom>
      ),
      align: "center",
    },

    {
      title: "Áp dụng đến",
      dataIndex: "effectiveTo",
      key: "effectiveTo",
      width: 200,
      render: (value: Date, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="left">
          {formatDateWithDayVN(value, true)}
        </TableLabelCustom>
      ),
      align: "center",
    },

    {
      title: "Là menu",
      dataIndex: "isMenu",
      key: "isMenu",
      width: 200,
      render: (value: boolean, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="center">
          {value ? <TagCustom type="green" >Là Menu</TagCustom> : <TagCustom type="orange">Không phải menu</TagCustom>}
        </TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Là menu dropdown",
      dataIndex: "isSubMenu",
      key: "isSubMenu",
      width: 200,
      render: (value: boolean, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="center">
          {value ? <TagCustom type="green" >Là menu dropdown</TagCustom> : <TagCustom type="orange">Không phải menu dropdown</TagCustom>}
        </TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Thứ tự sắp xếp",
      dataIndex: "sortNumber",
      key: "sortNumber",
      width: 200,
      render: (value: number, record: FeatureDTO, index: number) => (
        <TableLabelCustom align="center">{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 220,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TagCustom type={getStatusTag(value)}>{getStatusLabel(value)}</TagCustom>
      ),
      align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "maker",
      key: "maker",
      width: 160,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 240,
      render: (value: Date, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 240,
      render: (value: Date, record: FeatureDTO, index: number) => (
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
      render: (value: string, record: FeatureDTO, index: number) => (
        <div
          style={{
            padding: "8px 11px",
          }}
        >
          {record.status === ACTIVE && (
            <ArchiveBtn
              disable={!allowBtnCode("ARCHIVE_ROLE")}
              handleArchive={() => {
                handleArchiveActiveRow(record);
              }}
            />
          )}
          {record.status === ROLE_ARCHIVE && (
            <ReOpenBtn
              disable={!allowBtnCode("ACTIVE_ROLE")}
              handleReopen={() => {
                handleArchiveActiveRow(record);
              }}
            />
          )}
        </div>
      ),
      align: "center",
    },
  ];

export const getColumnsEdit = ({
  handleSetFeatureName,
  handleSetFeatureCode,
  handleSetFeatureParent,
  handleSetSystem,
  handleSetEffectiveType,
  handleSetStatus,
  handleSetEffectiveFrom,
  handleSetEffectiveTo,
  handleSetFeUri,
  handleSetIsMenu,
  handleSetIsSubMenu,
  features,
  systems,
}: CallBacks) => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      align: "center",
      width: 80,
      render: (value: string, record: FeatureDTO, index: number) => (
        <TableLabelCustom>{index + 1}</TableLabelCustom>
      ),
    },
    {
      title: "Tên chức năng",
      dataIndex: "featureName",
      key: "featureName",
      align: "center",
      width: 240,
      render: (value: string, record: FeatureDTO, index: number) => (
        <InputCustom
          status={record.isErrorFeatureName ? "error" : ""}
          defaultValue={record.featureName}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetFeatureName(record, value);
          }}
        />
      ),
    },
    {
      title: "Mã chức năng",
      dataIndex: "featureCode",
      key: "featureCode",
      align: "center",
      width: 240,
      render: (value: string, record: FeatureDTO, index: number) => (
        <InputCustom
          disabled={record.isNewRow ? false : true}
          defaultValue={record.featureCode}
          status={record.isErrorFeatureCode ? "error" : ""}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetFeatureCode(record, value);
          }}
        />
      ),
    },
    {
      title: "Key đường dẫn giao diện",
      dataIndex: "feUri",
      key: "feUri",
      align: "center",
      width: 220,
      render: (value: string, record: FeatureDTO, index: number) => (
        <InputCustom
          defaultValue={record.feUri}
          status={record.isErrorFeatureFeUri ? "error" : ""}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetFeUri(record, value);
          }}
        />
      ),
    },
    {
      title: "Tiêu đề hiển thị",
      dataIndex: "feLabel",
      key: "feLabel",
      align: "center",
      width: 220,
      render: (value: string, record: FeatureDTO, index: number) => (
        <InputCustom
          defaultValue={record.feLabel}
          status={record.isErrorFeatureFeUri ? "error" : ""}
          onBlur={(e) => {
            const value = e.target.value;
            handleSetFeatureCode(record, value);
          }}
        />
      ),
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      align: "center",
      width: 240,
      render: (value: string, record: FeatureDTO, index: number) => (
        <SelectCustom
          size="small"
          value={record.icon}
          options={reactIconPool.map((icon) => {
            return {
              label: (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        marginRight: "4px",
                      }}
                    >
                      {getIcon(icon.value)}
                    </span>
                    {icon.value}
                  </div>
                </>
              ),
              value: icon.value,
            };
          })}
          onChange={(e) => {
            const value = e;
            handleSetSystem(record, value);
          }}
        />
      ),
    },
    {
      title: "Chức năng cha",
      dataIndex: "parentId",
      key: "parentId",
      align: "center",
      width: 240,
      render: (value: string, record: FeatureDTO, index: number) => (
        <SelectCustom
          size="small"
          value={record.parentId}
          options={features.map((f) => {
            return {
              label: f.featureName,
              value: f.featureId,
            };
          })}
          onChange={(e) => {
            const value = e;
            handleSetFeatureParent(record, value);
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
      render: (value: string, record: FeatureDTO, index: number) => (
        <SelectCustom
          size="small"
          value={record.systemId}
          options={systems.map((s) => {
            return {
              label: s.systemName,
              value: s.systemId,
            };
          })}
          onChange={(e) => {
            const value = e;
            handleSetSystem(record, value);
          }}
        />
      ),
    },
    {
      title: "Kiểu áp dụng",
      dataIndex: "effectiveType",
      key: "effectiveType",
      align: "center",
      width: 200,
      render: (value: string, record: FeatureDTO, index: number) => (
        <SelectCustom
          size="small"
          status={record.isErrorFeatureEffectiveType ? "error" : ""}
          value={record.effectiveType}
          options={effectiveType}
          onChange={(e) => {
            const value = e;
            handleSetEffectiveType(record, value);
          }}
        />
      ),
    },
    {
      title: "Áp dụng từ",
      dataIndex: "effectiveFrom",
      key: "effectiveFrom",
      align: "center",
      width: 200,
      render: (value: string, record: FeatureDTO, index: number) => (
        <DatePickerCustom
          showTime
          status={record.isErrorFeatureEffectiveFrom ? "error" : ""}
          value={value ? dayjs(value) : null}
          disabled={record.effectiveType != "E"}
          placeholder="Chọn thời gian áp dụng từ"
          onChange={(e) => {
            const value = e;
            handleSetEffectiveFrom(record, value as dayjs.Dayjs | null);
          }}
        />
      ),
    },
    {
      title: "Áp dụng đến",
      dataIndex: "effectiveTo",
      key: "effectiveTo",
      align: "center",
      width: 200,
      render: (value: string, record: FeatureDTO, index: number) => (
        <DatePickerCustom
          showTime
          status={record.isErrorFeatureEffectiveTo ? "error" : ""}
          value={value ? dayjs(value) : null}
          disabled={record.effectiveType != "E"}
          placeholder="Chọn thời gian áp dụng đến"
          onChange={(e) => {
            const value = e;
            handleSetEffectiveTo(record, value as dayjs.Dayjs | null);
          }}
        />
      ),
    },
    {
      title: "Là menu",
      dataIndex: "isMenu",
      key: "isMenu",
      align: "center",
      width: 160,
      render: (value: string, record: FeatureDTO, index: number) => (
        <SwitchCustom
          size="small"
          defaultValue={record.isMenu}
          onChange={(e) => {
            handleSetIsMenu(record, e);
          }}
        />
      ),
    },
    {
      title: "Là menu dropdown",
      dataIndex: "isSubMenu",
      key: "isSubMenu",
      align: "center",
      width: 160,
      render: (value: string, record: FeatureDTO, index: number) => (
        <SwitchCustom
          size="small"
          defaultValue={record.isSubMenu}
          onChange={(e) => {
            handleSetIsSubMenu(record, e);
          }}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 110,
      render: (value: string, record: FeatureDTO, index: number) => (
        <SwitchCustom
          size="small"
          defaultValue={record.status === ACTIVE}
          onChange={(e) => {
            handleSetStatus(record, e);
          }}
        />
      ),
    },
  ];
