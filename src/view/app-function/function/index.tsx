import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import {
  ColumnTypeCustom,
  getScrollPx,
  TablePropsCustom,
} from "@/component/TableCustom";
import { useEffect, useState } from "react";
import { applicationApi } from "@/api/applicationApi";
import { getColumns, getColumnsEdit } from "./columns";
import { isNotHasRole } from "@/util/checkRoleBtn";
import { Function } from "@/model/function/Function";
import { functionApi, FunctionFilter } from "@/api/functionApi";

import dayjs from "dayjs";
import { DATE_TYPE1 } from "@/constant/dateFormat";
import { orderByCreatedAt } from "@/util/orderBaseTableData";

export const FunctionPage = () => {
  const [page, setPage] = useState([] as Function[]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 20,
    totalData: 0,
  } as FunctionFilter);
  const [scrollPx, setScrollPx] = useState(200);
  const [viewMode, setViewMode] = useState(true);

  const handleDeleteRow = async (row: Function) => {
    if (!row.functionId) {
      alert(123);
      return;
    }
    const res = applicationApi.deleteApplication({
      applicationIds: [row.functionId],
    });
    row.isDeleted = true;
    setPage((page) => ({
      ...page,
    }));
  };

  const addNewData = async () => {
    try {
      setIsTableLoading(true);
      const newDataList = page.filter((data) => {
        return data.isNewRow;
      });
      const res = await functionApi.create({
        createFunctions: newDataList || [],
      });
      const dataNow = page.filter((data) => {
        return data.functionId;
      });
      setPage((page) => orderByCreatedAt([...dataNow, ...res]));
      // const update = page.filter((data) => {
      //   return data.isEdited && !data.isNewRow;
      // });

      // if (update) {
      //   const resUp = await applicationApi.updateApplication({
      //     updateApplication: update,
      //   });
      // }
    } catch (e) {
      throw e;
    } finally {
      setIsTableLoading(false);
    }
  };
  const handleSetName = (row: Function, value: string) => {
    row.functionName = value;
    row.isEdited = true;
  };
  const handleSetIcon = (row: Function, value: string) => {
    row.functionIcon = value;
    row.isEdited = true;
  };
  const handleSetFunctionCode = (row: Function, value: string) => {
    row.functionCode = value;
    row.isEdited = true;
  };
  const handleSetEffectType = (row: Function, value: string) => {
    row.effectType = value;
    row.isEdited = true;
  };
  const handleSetEffectFrom = (row: Function, value: dayjs.Dayjs) => {
    row.effectFrom = value.format(DATE_TYPE1);
    row.isEdited = true;
  };
  const handleSetEffectTo = (row: Function, value: dayjs.Dayjs) => {
    row.effectTo = value.format(DATE_TYPE1);
    row.isEdited = true;
  };
  const handleExpandHeader = (keys: string[], toCol: string) => {
    setExpandedCols((prev) => {
      const updated = { ...prev };
      keys.forEach((k) => {
        updated[k] = !prev[k];
      });
      return updated;
    });
    const px = getScrollPx(toCol, config.columns as ColumnTypeCustom<object>[]);
    console.error(px);

    setScrollPx(px);
  };

  const [expandedCols, setExpandedCols] = useState<Record<string, boolean>>({
    functionIcon: false,
    effectType: true,
  });

  const columnsEdit = getColumnsEdit({
    handleDeleteRow,
    handleSetName,
    handleSetIcon,
    handleSetFunctionCode,
    handleSetEffectType,
    handleSetEffectFrom,
    handleSetEffectTo,
  });

  const toggleViewMode = (mode: boolean) => {
    setViewMode(mode);
  };
  const pageConfig = {
    current: filter.pageNumber + 1, // Trang hiện tại
    pageSize: filter.pageSize, // Số phần tử/trang
    total: filter.totalData, // Tổng số phần tử
    showSizeChanger: true, // Cho phép chọn số phần tử/trang
    pageSizeOptions: ["10", "20", "50", "100", "500"], // Tuỳ chọn pageSize
    onChange: (page: number, pageSize: number) => {
      setFilter({
        ...filter,
        pageNumber: page,
        pageSize: pageSize,
      });
      handleGetData(filter, null);
    },
  };
  const config = {
    pagination: pageConfig,
    columns: getColumns({
      handleDeleteRow,
      handleSetName,
      handleSetIcon,
      handleSetFunctionCode,
      handleSetEffectType,
      handleSetEffectFrom,
      handleSetEffectTo,
      handleExpandHeader,
      expandedCols,
    }).map((col) => {
      if (!expandedCols[col.dataIndex as string]) {
        return {
          ...col,
          children: [],
        };
      }
      return col;
    }),
    scrollPx: scrollPx,
    columnsEdit: columnsEdit,
    loading: isTableLoading,
    dataSource: [{ functionIcon: "123" }, { functionIcon: "dfgfdfgd" }],
    viewMode: viewMode,
    tableName: "Chức năng",
    extendFunction: {
      buttonReloadFunction: () => {
        handleGetData({ ...filter }, null);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: isNotHasRole("VIEW-APPLICATION"),
      handleUpdateDataSource: (data: []) => {
        setPage([...data]);
      },
      andOn: "table",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        addNewData().catch((e) => {
          throw e;
        });
      },
    },
  } as TablePropsCustom<Function>;

  const handleGetData = async (
    params: FunctionFilter,
    signal: AbortSignal | null
  ) => {
    try {
      setIsTableLoading(true);
      const res = await functionApi.getFunctionByFilter(
        {
          ...filter,
          ...params,
        },
        signal as AbortSignal
      );
      setFilter({
        ...filter,
        totalData: res.totalElements,
      });
      setPage(orderByCreatedAt(res.content));
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableLoading(false);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    handleGetData({ ...filter }, signal);
    return () => {
      controller.abort();
    };
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
        <Filter handleFilter={handleGetData} />
      </Content>
      <TableData config={config} />
    </>
  );
};
