import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";

import { orderByCreatedAt } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import { GetSystemFilter, systemApi } from "@/api/systemApi";
import {
  SYSTEM_ACTIVE,
  SYSTEM_IN_ACTIVE,
  SystemDTO,
} from "@/model/cms/system/SystemDTO";
import { AuditSystemData } from "@/model/cms/system/AuditSystemData";

export const Index = () => {
  const [data, setData] = useState({} as { data: SystemDTO[] });
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalData: 0,
    // status: ["ACTIVE"],
  } as GetSystemFilter);
  const [viewMode, setViewMode] = useState(true);
  const modal = useGlobalModal();

  const addNewData = async () => {
    let isError = false;
    try {
      setIsTableLoading(true);
      const newData = data.data.filter((item) => item.isNewRow);
      const updateData = data.data.filter(
        (item) => item.isEdited && !item.isNewRow,
      );

      const request = {
        createData: newData,
        updateData: updateData,
      } as AuditSystemData;
      const res = await systemApi.auditSystem(request);
      if (res.code && res.code === "ERROR") {
        isError = true;
      }
    } catch (e) {
      throw e;
    } finally {
      handleGetData(filter, null);
      setIsTableLoading(false);
    }
  };

  const handleSetSystemName = (row: SystemDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, systemName: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetSystemCode = (row: SystemDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, systemCode: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetStatus = (row: SystemDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? {
            ...item,
            status: value ? SYSTEM_ACTIVE : SYSTEM_IN_ACTIVE,
            isEdited: true,
          }
          : item,
      ),
    }));
  };
  const handleSetUriGateway = (row: SystemDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, systemUriGateway: value, isEdited: true }
          : item,
      ),
    }));
  };

  const triggerNewRow = (row: SystemDTO) => {
    row.status = SYSTEM_ACTIVE;
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
      },
      null,
    );
  };

  const columnsEdit = getColumnsEdit({
    handleSetSystemName,
    handleSetSystemCode,
    handleSetUriGateway,
    handleSetStatus,
  } as CallBacks);

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
  const config = {
    pagination: pageConfig,
    columns: getColumns({} as CallBacks),
    columnsEdit: columnsEdit,
    loading: isTableLoading,
    dataSource: data.data as SystemDTO[],
    viewMode: viewMode,
    tableName: "Quản lý quyền",
    extendFunction: {
      triggerNewRow: triggerNewRow,
      quickSearch: true,
      handleQuickSearch: handleQuickSearch,
      buttonReloadFunction: () => {
        handleGetData(filter, null);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: !allowBtnCode("AUDIT_SYSTEM"),
      handleUpdateDataSource: (data: []) => {
        setData({ data: [...data] });
      },
      andOn: "table",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        addNewData();
      },
    },
  } as TablePropsCustom<SystemDTO>;

  const handleGetData = async (
    params: GetSystemFilter,
    signal: AbortSignal | null,
  ) => {
    try {
      setIsTableLoading(true);
      const res = await systemApi.getSystem(
        {
          ...params,
        },
        signal as AbortSignal,
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

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      const controller = new AbortController();
      handleGetData({ ...filter }, controller.signal);

      return () => controller.abort();
    }
  }, []);

  return (
    <>
      <Content
        style={{
          marginBottom: "12px !important",
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
