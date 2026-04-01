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
  FEATURE_ACTIVE,
  FEATURE_ARCHIVE,
  FeatureDTO,
} from "@/model/cms/feature/FeatureDTO";
import {
  CreateFeatureRequestData,
  UpdateFeatureRequestData,
} from "@/model/cms/feature/AuditFeatureRequest";
import { GetSystemFilter, systemApi } from "@/api/systemApi";
import { GetFeatureRequest } from "@/model/cms/feature/GetFeatureRequest";
import { SYSTEM_ACTIVE, SystemDTO } from "@/model/cms/system/SystemDTO";

export const Index = () => {
  const [data, setData] = useState({} as { data: FeatureDTO[] });
  const [features, setFeatures] = useState([] as FeatureDTO[]);
  const [systems, setSystems] = useState([] as SystemDTO[]);
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
        const res = await featureApi.archiveActive({
          featureId: row.featureId,
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
            ...item,
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

  const handleSetFeatureName = (row: FeatureDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, featureName: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetFeatureCode = (row: FeatureDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, featureCode: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetFeatureParent = (row: FeatureDTO, value: number) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, parentId: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetSystem = (row: FeatureDTO, value: number) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, systemId: value, isEdited: true }
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
              status: value ? FEATURE_ACTIVE : FEATURE_ARCHIVE,
              isEdited: true,
            }
          : item,
      ),
    }));
  };
  const handleSetFeUri = (row: FeatureDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, feUri: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetIsMenu = (row: FeatureDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, isMenu: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetIsSubMenu = (row: FeatureDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, isSubMenu: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetIcon = (row: FeatureDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, icon: value, isEdited: true }
          : item,
      ),
    }));
  };

  const handleSetSortNumber = (row: FeatureDTO, value: number) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, sortNumber: value, isEdited: true }
          : item,
      ),
    }));
  };

  const triggerNewRow = (row: FeatureDTO) => {
    row.status = FEATURE_ACTIVE;
    row.isMenu = false;
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
    handleSetIcon,
    handleSetSortNumber,
    features,
    systems,
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
      disableAddData: !allowBtnCode("AUDIT_FEATURE"),
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
  } as TablePropsCustom<FeatureDTO>;

  const handleGetData = async (
    params: GetFeatureRequest,
    signal: AbortSignal | null,
  ) => {
    try {
      setIsTableLoading(true);
      const res = await featureApi.getFeature(
        {
          ...params,
          isTakeRoleApply: true,
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
  const handleGetAllFeature = async () => {
    try {
      const res = await featureApi.getFeature({} as GetRoleFilter);
      setFeatures(res.data);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  const handleGetSystem = async () => {
    try {
      const params = {} as GetSystemFilter;
      const res = await systemApi.getSystem(params);
      setSystems(res.data);
    } catch (e) {
      console.error(e);
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
    handleGetSystem();
    handleGetAllFeature();
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
          features={features.map((f) => {
            return {
              label: f.featureName,
              value: f.featureId,
            };
          })}
          handleFilter={handleGetData}
          filter={filter}
        />
      </Content>
      <TableData config={config} />
    </>
  );
};
