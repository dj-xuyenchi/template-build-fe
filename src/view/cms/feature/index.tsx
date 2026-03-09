import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";

import { orderByCreatedAt } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { roleApi } from "@/api/roleApi";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import dayjs from "dayjs";

import { toDateSendBE } from "@/util/date/dateUtil";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import { featureApi } from "@/api/featureApi";
import { FEATURE_ACTIVE, FeatureDTO } from "@/model/feature/FeatureDTO";
import {
  CreateFeatureRequestData,
  UpdateFeatureRequestData,
} from "@/model/feature/AuditFeatureRequest";

export const Index = () => {
  const [data, setData] = useState({} as { data: FeatureDTO[] });

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalData: 0,
    // status: ["ACTIVE"],
  } as GetRoleFilter);
  const [viewMode, setViewMode] = useState(true);
  const modal = useGlobalModal();

  const handleArchiveActiveRow = async (row: FeatureDTO) => {
    if (!row.featureId) {
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn ${row.status == FEATURE_ACTIVE ? "lưu trữ" : "active lại"} chức năng này không?`,
      centered: true,
      onOk: async () => {
        const res = await roleApi.archiveActive({
          id: row.featureId,
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
        .map((item: FeatureDTO) => {
          return {
            effectiveType: item.effectiveType,
            effectiveFrom: item.effectiveFrom,
            effectiveTo: item.effectiveTo,
            status: item.status,
          } as CreateFeatureRequestData;
        });
      const updateDataList = data.data.filter((item) => {
        return item.isEdited && item.featureId;
      }) as UpdateFeatureRequestData[];
      const request = {
        create: newDataList || [],
        update: updateDataList || [],
      };
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
  const handleSetName = (row: FeatureDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, featureName: value, isEdited: true }
          : item,
      ),
    }));
  };

  const handleSetEffectiveType = (row: FeatureDTO, value: string) => {
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
            isErrorFeatureEffectiveFrom: false,
            isErrorFeatureEffectiveTo: false,
          }
          : item,
      ),
    }));
  };
  const handleSetEffectiveFrom = (
    row: FeatureDTO,
    value: dayjs.Dayjs | null,
  ) => {
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
  const handleSetEffectiveTo = (row: FeatureDTO, value: dayjs.Dayjs | null) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, effectiveTo: toDateSendBE(value), isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetStatus = (row: FeatureDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? {
            ...item,
            status: value ? ROLE_ACTIVE : ROLE_ACTIVE,
            isEdited: true,
          }
          : item,
      ),
    }));
  };

  const triggerNewRow = (row: FeatureDTO) => {
    row.status = FEATURE_ACTIVE;
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
    handleSetName,
    handleSetEffectiveType,
    handleSetStatus,
    handleSetEffectiveFrom,
    handleSetEffectiveTo,
    handleArchiveActiveRow,
  });

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
    columns: getColumns({
      handleArchiveActiveRow,
    } as CallBacks),
    columnsEdit: columnsEdit,
    loading: isTableLoading,
    dataSource: data.data as FeatureDTO[],
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
        let isError = false;
        const validData = data.data.filter((data) => {
          if (!data.roleName || data.roleName.trim() == "") {
            data.isErrorRoleName = true;
            isError = true;
          } else {
            data.isErrorRoleName = false;
          }
          if (!data.roleCode || data.roleCode.trim() == "") {
            data.isErrorRoleCode = true;
            isError = true;
          } else {
            data.isErrorRoleCode = false;
          }
          if (!data.effectiveType || data.effectiveType.trim() == "") {
            data.isErrorRoleEffectiveType = true;
            isError = true;
          } else {
            data.isErrorRoleEffectiveType = false;
          }
          if (data.effectiveType == "E") {
            if (!data.effectiveFrom) {
              data.isErrorRoleEffectiveFrom = true;
              isError = true;
            } else {
              data.isErrorRoleEffectiveFrom = false;
            }
            if (!data.effectiveTo) {
              data.isErrorRoleEffectiveTo = true;
              isError = true;
            } else {
              data.isErrorRoleEffectiveTo = false;
            }
          }
          return data;
        });
        if (isError) {
          setData((prev) => ({
            ...prev,
            data: [...validData],
          }));
          return false;
        } else {
          addNewData().catch((e) => {
            throw e;
          });
        }
      },
    },
  } as TablePropsCustom<FeatureDTO>;

  const handleGetData = async (
    params: GetRoleFilter,
    signal: AbortSignal | null,
  ) => {
    try {
      setIsTableLoading(true);
      const res = await featureApi.getFeature(
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
          handleFilter={handleGetData}
          filter={filter}
          setFilter={setFilter}
        />
      </Content>
      <TableData config={config} />
    </>
  );
};
