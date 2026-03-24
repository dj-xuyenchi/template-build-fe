import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";

import { orderByCreatedAt } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import dayjs from "dayjs";

import { toDateSendBE } from "@/util/date/dateUtil";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import { featureApi } from "@/api/featureApi";

import {
  CreateFeatureRequestData,
  UpdateFeatureRequestData,
} from "@/model/feature/AuditFeatureRequest";
import { GetSystemFilter, systemApi } from "@/api/systemApi";
import { SYSTEM_ACTIVE, SystemDTO } from "@/model/system/SystemDTO";

export const Index = () => {
  const [data, setData] = useState({} as { data: SystemDTO[] });
  const [features, setFeatures] = useState([] as SystemDTO[]);
  const [systems, setSystems] = useState([] as SystemDTO[]);
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

      const request = {};
      const res = await featureApi.auditFeature(request);
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

  const handleSetFeatureName = (row: SystemDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, featureName: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetFeatureCode = (row: SystemDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, featureCode: value, isEdited: true }
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
              status: value ? FEATURE_ACTIVE : FEATURE_ARCHIVE,
              isEdited: true,
            }
          : item,
      ),
    }));
  };
  const handleSetFeUri = (row: SystemDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, feUri: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetIsMenu = (row: SystemDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, isMenu: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetIsSubMenu = (row: SystemDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, isSubMenu: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetIcon = (row: SystemDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, icon: value, isEdited: true }
          : item,
      ),
    }));
  };

  const handleSetSortNumber = (row: SystemDTO, value: number) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, sortNumber: value, isEdited: true }
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

  const columnsEdit = getColumnsEdit({} as CallBacks);

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
      disableAddData: !allowBtnCode("AUDIT_ROLE"),
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
        <Filter
          systemList={systems.filter((s) => {
            return s.status === SYSTEM_ACTIVE;
          })}
          handleFilter={handleGetData}
          filter={filter}
        />
      </Content>
      <TableData config={config} />
    </>
  );
};
