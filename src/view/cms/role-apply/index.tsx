import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useMemo, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";
import { AiFillDelete } from "react-icons/ai";
import {
  orderByField,
} from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { ROLE_ACTIVE, RoleDTO } from "@/model/cms/role/RoleDTO";
import { roleApi } from "@/api/roleApi";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import dayjs from "dayjs";

import { toDateSendBE } from "@/util/date/dateUtil";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import {
  GetOptionAsSelectRequest,
  GetRoleApplyFilter,
  roleApplyApi,
} from "@/api/roleApplyApi";
import {
  OptionAsSelect,
  RoleApplyDTO,
} from "@/model/cms/roleApply/RoleApplyDTO";
import { featureApi, GetFeatureFilter } from "@/api/featureApi";
import { FeatureDTO } from "@/model/cms/feature/FeatureDTO";
import { TableProps } from "antd";
import { ButtonCustom } from "@/component/ButtonCustom";
import { GlobalConfigData } from "@/model/global-config/GlobalConfigData";
import { GetGlobalConfigRequest, globalConfigApi } from "@/api/globalConfigApi";
import { getMessageInstance } from "@/config/push-noti-message/messageContext";
import { AuthorizeDataRequest } from "@/model/cms/roleApply/AuthorizeDataRequest";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const Index = () => {
  const [data, setData] = useState({} as { data: RoleApplyDTO[] });
  const [roleData, setRoleData] = useState(new Map() as Map<number, RoleDTO>);
  const [roleList, setRoleList] = useState([] as RoleDTO[]);
  const [featureData, setFeatureData] = useState(
    new Map() as Map<number, FeatureDTO>,
  );
  const [applyTypeList, setApplyTypeList] = useState([] as GlobalConfigData[]);
  const [applyValueList, setApplyValueList] = useState(
    [] as {
      value: string;
      label: string;
    }[],
  );
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    // status: ["ACTIVE"],
  } as GetRoleApplyFilter);
  const [viewMode, setViewMode] = useState(true);
  const [checkBoxSelectedData, setCheckBoxSelectedData] = useState(
    [] as number[],
  );
  const modal = useGlobalModal();
  const controllerRef = useRef<AbortController | null>(null);
  const messageApi = getMessageInstance();
  const dispatch = useDispatch();
  const addNewData = async () => {
    try {
      setIsTableLoading(true);
      const newDataList = data.data.filter((item) => {
        return item.isNewRow;
      });
      const updateDataList = data.data.filter((item) => {
        return item.isEdited && item.roleApplyId;
      });

      const request = {
        createData: newDataList,
        updateData: updateDataList,
      } as AuthorizeDataRequest;
      const res = await roleApplyApi.authorizeData(request);
      if (res.code && res.code === "ERROR") {
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
  const handleSetEffectiveFrom = (
    row: RoleApplyDTO,
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
  const handleSetEffectiveTo = (
    row: RoleApplyDTO,
    value: dayjs.Dayjs | null,
  ) => {
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
  const handleSetRole = (row: RoleApplyDTO, option: OptionAsSelect) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? {
            ...item,
            roleId: option.value,
            roleName: option.label,
            isEdited: true,
          }
          : item,
      ),
    }));
    return;
  };
  const handleDeleteRow = (row: RoleApplyDTO) => {
    if (row.isNewRow) {
      setData((prev) => ({
        ...prev,
        data: prev.data.filter((item) => item.rowUUID !== row.rowUUID),
      }));
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn xóa phân quyền này không?`,
      centered: true,
      onOk: async () => {
        const res = await roleApplyApi.deleteRoleApply({
          roleApplyIds: [row.roleApplyId as number],
        });
        if (res.code == "SUCCESS") {
          handleGetData(filter);
        }
      },
    });
  }
  const handleSetApplyType = async (row: RoleApplyDTO, value: string) => {
    try {
      setData((prev) => ({
        ...prev,
        data: prev.data.map((item) =>
          item.rowUUID === row.rowUUID
            ? {
              ...item,
              isLoadingOption: true
            }
            : item,
        ),
      }));
      const request = {} as GetOptionAsSelectRequest;
      request.applyType = value;
      const option = await roleApplyApi.optionAsSelect(request);
      setData((prev) => ({
        ...prev,
        data: prev.data.map((item) =>
          item.rowUUID === row.rowUUID
            ? {
              ...item,
              applyType: value,
              optionApplyValue: option.data || [],
              isEdited: true,
            }
            : item,
        ),
      }));
    } finally {
      setData((prev) => ({
        ...prev,
        data: prev.data.map((item) =>
          item.rowUUID === row.rowUUID
            ? {
              ...item,
              isLoadingOption: false
            }
            : item,
        ),
      }));
    }

    return;
  };
  const handleSetApplyValue = (row: RoleApplyDTO, option: OptionAsSelect) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? {
            ...item,
            applyId: option.value,
            applyName: option.label,
            isEdited: true,
          }
          : item,
      ),
    }));
    return;
  };
  const triggerNewRow = (row: RoleApplyDTO) => {
    row.status = ROLE_ACTIVE;
    row.effectiveType = "NE";
    return true;
  };
  const handleQuickSearch = (keyword: string) => {
    setFilter({
      ...filter,
      keyword: keyword,
    });
    handleGetData({
      ...filter,
      keyword: keyword,
    });
  };
  const handleDeleteBatch = () => {
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn xóa phân quyền này không?`,
      centered: true,
      onOk: async () => {
        if (checkBoxSelectedData && checkBoxSelectedData.length < 1) {
          messageApi.warning("Chọn ít nhất 1 bản ghi dữ liệu!");
        }
        const res = await roleApplyApi.deleteRoleApply({
          roleApplyIds: checkBoxSelectedData,
        });
        if (res.code == "SUCCESS") {
          handleGetData(filter);
          setCheckBoxSelectedData([]);
        }
      },
    });
  };

  const toggleViewMode = (mode: boolean) => {
    setViewMode(mode);
  };
  const pageConfig = {
    total: data?.data?.length, // Tổng số phần tử
    showSizeChanger: true, // Cho phép chọn số phần tử/trang
    pageSizeOptions: ["10", "20", "50", "100", "500"], // Tuỳ chọn pageSize
    onChange: (page: number, pageSize: number) => {
      setFilter({
        ...filter,
      });
    },
  };
  const columns = useMemo(() => {
    return getColumns({
      handleDeleteRow,
      roleMap: roleData,
    } as CallBacks);
  }, [roleData, featureData]);
  const deleteBtn = (
    <>
      <ButtonCustom
        danger
        title="Xóa dữ liệu"
        style={{
          marginLeft: "8px",
        }}
        icon={<AiFillDelete />}
        disabled={checkBoxSelectedData.length < 1 || !allowBtnCode("DELETE_ROLE_APPLY")}
        onClick={handleDeleteBatch}
      />
    </>
  );
  const config = {
    pagination: pageConfig,
    columns: columns,
    columnsEdit: getColumnsEdit({
      handleSetApplyValue,
      handleSetApplyType,
      handleSetRole,
      handleSetEffectiveFrom,
      handleSetEffectiveTo,
      handleSetEffectiveType,
      handleSetStatus,
      handleDeleteRow,
      roleList,
      applyTypeList,
      applyValueList,
    }),
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
      disableAddData: !allowBtnCode("AUDIT_ROLE_APPLY"),
      handleUpdateDataSource: (data: RoleApplyDTO[]) => {
        setData({ data: [...data] });
      },
      andOn: "table",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        addNewData().catch((e) => {
          throw e;
        });
      },
      extendComponents: [deleteBtn],
    },
    rowSelection:
      viewMode &&
      ({
        type: "checkbox",
        onChange: (
          selectedRowKeys: React.Key[],
          selectedRows: RoleApplyDTO[],
        ) => {
          console.log("selected -> ", selectedRows);
          const selectedIds = selectedRows.map((r) => {
            return r.roleApplyId;
          });

          setCheckBoxSelectedData(selectedIds);
        },
        getCheckboxProps: (record: RoleApplyDTO) => ({
          disabled: record.isNewRow,
        }),
      } as TableProps<RoleApplyDTO>["rowSelection"]),
  } as TablePropsCustom<RoleApplyDTO>;

  const handleGetRoleData = async () => {
    try {
      const res = await roleApi.getRole({} as GetRoleFilter);
      const map = new Map(res.data.map((item) => [item.roleId, item]));
      setRoleData(map);
      setRoleList(res.data);
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
      setFilter(params);

      setData({
        data: orderByField(res.data, "roleApplyId"),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableLoading(false);
    }
  };
  const handleGetApplyType = async () => {
    try {
      const request = {
        globalConfigCode: "APPLY_TYPE_ROLE",
        isTakeGlobalConfigData: true,
      } as GetGlobalConfigRequest;
      const res = await globalConfigApi.getGlobalConfig(request);
      if (res.code == "SUCCESS") {
        setApplyTypeList(res.data.globalConfigData);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const { triggerCallBackFlag, callBackParams } = useSelector(
    (state: RootState) => state.global.appSlice
  );
  useEffect(() => {
    handleGetRoleData();
    handleGetFeatureData();
    handleGetApplyType();
    handleGetData({ ...filter });

  }, []);
  useEffect(() => {
    if (triggerCallBackFlag) {
      handleGetData({ ...filter });
    }
  }, [triggerCallBackFlag]);
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
        <Filter
          handleFilter={handleGetData}
          filter={filter}
          roleList={roleList}
          applyTypeList={applyTypeList}
        />
      </Content>
      <TableData config={config} />
    </>
  );
};
