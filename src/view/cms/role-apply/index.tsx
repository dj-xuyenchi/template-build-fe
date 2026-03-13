import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useMemo, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";

import { orderByCreatedAt } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { ROLE_ACTIVE, RoleDTO } from "@/model/cms/role/RoleDTO";
import { roleApi } from "@/api/roleApi";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import dayjs from "dayjs";
import {
  CreateRoleRequestData,
  UpdateRoleRequestData,
} from "@/model/cms/role/AuditRoleRequest";
import { toDateSendBE } from "@/util/date/dateUtil";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import { GetRoleApplyFilter, roleApplyApi } from "@/api/roleApplyApi";
import { RoleApplyDTO } from "@/model/roleApply/RoleApplyDTO";
import { featureApi, GetFeatureFilter } from "@/api/featureApi";
import { FeatureDTO } from "@/model/feature/FeatureDTO";
import { TableProps } from "antd";

export const Index = () => {
  const [data, setData] = useState({} as { data: RoleApplyDTO[] });
  const [roleData, setRoleData] = useState(new Map() as Map<number, RoleDTO>);
  const [featureData, setFeatureData] = useState(
    new Map() as Map<number, FeatureDTO>,
  );

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalData: 0,
    // status: ["ACTIVE"],
  } as GetRoleFilter);
  const [viewMode, setViewMode] = useState(true);
  const modal = useGlobalModal();
  const controllerRef = useRef<AbortController | null>(null);
  const handleArchiveActiveRow = async (row: RoleDTO) => {
    if (!row.roleId) {
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn ${row.status == ROLE_ACTIVE ? "lưu trữ" : "active lại"} quyền này không?`,
      centered: true,
      onOk: async () => {
        const res = await roleApi.archiveActive({
          id: row.roleId,
        });
        if (res.code && res.code !== "ERROR") {
          handleGetData(filter, null);
        }
      },
    });
  };

  const addNewData = async () => {
    let isError = false;
    try {
      setIsTableLoading(true);
      const newDataList = data.data
        .filter((item) => {
          return item.isNewRow;
        })
        .map((item: RoleApplyDTO) => {
          return {
            effectiveType: item.effectiveType,
            effectiveFrom: item.effectiveFrom,
            effectiveTo: item.effectiveTo,
            status: item.status,
          } as CreateRoleRequestData;
        });
      const updateDataList = data.data.filter((item) => {
        return item.isEdited && item.roleId;
      }) as UpdateRoleRequestData[];
      const request = {
        create: newDataList || [],
        update: updateDataList || [],
      };
      const res = await roleApi.auditRole(request);
      if (res.code && res.code === "ERROR") {
        isError = true;
      }
    } catch (e) {
      throw e;
    } finally {
      handleGetData(filter);
      setIsTableLoading(false);
    }
  };
  const handleSetEffectiveType = (row: RoleApplyDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? {
            ...item,
            effectiveType: value,
            isEdited: true,
            effectiveFrom: value == "NE" ? undefined : item.effectiveFrom,
            effectiveTo: value == "NE" ? undefined : item.effectiveTo,
            isErrorRoleEffectiveFrom: false,
            isErrorRoleEffectiveTo: false,
          }
          : item,
      ),
    }));
  };
  const handleSetEffectiveFrom = (row: RoleApplyDTO, value: dayjs.Dayjs | null) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, effectiveFrom: toDateSendBE(value), isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetEffectiveTo = (row: RoleApplyDTO, value: dayjs.Dayjs | null) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, effectiveTo: toDateSendBE(value), isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetStatus = (row: RoleApplyDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, status: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetRole = (row: RoleApplyDTO, value: number) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, roleId: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetApplyType = (row: RoleApplyDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, applyType: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetApplyValue = (row: RoleApplyDTO, value: number) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, applyId: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const triggerNewRow = (row: RoleApplyDTO) => {
    row.status = ROLE_ACTIVE;
    return true;
  };
  const handleQuickSearch = (keyword: string) => {
    setFilter({
      ...filter,
      keyword: keyword,
    });
    handleGetData(
      {
        ...filter,
        keyword: keyword,
      }
    );
  };

  const toggleViewMode = (mode: boolean) => {
    setViewMode(mode);
  };
  const pageConfig = {
    current: filter.pageNumber + 1, // Trang hiện tại
    pageSize: filter.pageSize, // Số phần tử/trang
    total: data?.data?.length, // Tổng số phần tử
    showSizeChanger: true, // Cho phép chọn số phần tử/trang
    pageSizeOptions: ["10", "20", "50", "100", "500"], // Tuỳ chọn pageSize
    onChange: (page: number, pageSize: number) => {
      setFilter({
        ...filter,
        pageNumber: page - 1,
        pageSize: pageSize,
      });
    },
  };
  const columns = useMemo(() => {
    return getColumns({
      roleMap: roleData,
      featureMap: featureData,
    } as CallBacks);
  }, [roleData, featureData]);

  const config = {
    pagination: pageConfig,
    columns: columns,
    columnsEdit: getColumnsEdit(
      {
        handleSetApplyValue,
        handleSetApplyType,
        handleSetRole,
        handleSetEffectiveFrom,
        handleSetEffectiveTo,
        handleSetEffectiveType,
        handleSetStatus
      }
    ),
    loading: isTableLoading,
    dataSource: data.data as RoleApplyDTO[],
    viewMode: viewMode,
    tableName: "Quản lý phân quyền",
    extendFunction: {
      triggerNewRow: triggerNewRow,
      quickSearch: true,
      handleQuickSearch: handleQuickSearch,
      buttonReloadFunction: () => {
        handleGetData(filter);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: !allowBtnCode("AUDIT_ROLE"),
      handleUpdateDataSource: (data: RoleApplyDTO[]) => {
      },
      andOn: "table",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        return true;
      },
    },
    rowSelection: {
      type: "checkbox",
      onChange: (selectedRowKeys: React.Key[], selectedRows: RoleApplyDTO[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record: RoleApplyDTO) => ({
        disabled: record.rowUUID === 'Disabled User', // Column configuration not to be checked
        name: record.applyType,
      }),
    } as TableProps<RoleApplyDTO>['rowSelection'],
  } as TablePropsCustom<RoleApplyDTO>;

  const handleGetRoleData = async () => {
    try {
      const res = await roleApi.getRole({} as GetRoleFilter);
      const map = new Map(res.data.map((item) => [item.roleId, item]));
      setRoleData(map);
    } catch (e) {
      console.error(e);
    }
  };
  const handleGetFeatureData = async () => {
    try {
      const res = await featureApi.getFeature({} as GetFeatureFilter);
      const map = new Map(res.data.map((item) => [item.featureId, item]));
      setFeatureData(map);
    } catch (e) {
      console.error(e);
    }
  };
  const handleGetData = async (params: GetRoleApplyFilter) => {
    try {
      // abort request cũ
      controllerRef.current?.abort();

      // tạo controller mới
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsTableLoading(true);
      const res = await roleApplyApi.getRoleApply(
        {
          ...params,
        },
        controller.signal,
      );

      setData({
        data: orderByCreatedAt(res.data),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableLoading(false);
    }
  };
  useEffect(() => {
    handleGetRoleData();
    handleGetFeatureData();
    handleGetData({ ...filter });
  }, []);

  return (
    <>
      <Content
        style={{
          marginBottom: "12px",
          padding: "0px 24px 0px 24px",
          margin: 0,
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Filter handleFilter={handleGetData} filter={filter} />
      </Content>
      <TableData config={config} />
    </>
  );
};
