"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Table,
  TableProps,
  Row,
  Col,
  Tooltip,
  Drawer,
  Modal,
  message,
} from "antd";
import "@/config/styleOverride.css";
import { ButtonCustom } from "./ButtonCustom";
import { v4 as uuidv4 } from "uuid";
import {
  SyncOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoSearchSharp, IoSettingsSharp } from "react-icons/io5";
import {
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColumnType } from "antd/es/table";
import { CheckBoxCustom } from "./CheckBoxCustom";
import { CollapseCustom } from "./CollapseCustom";
import { InputNumberCustom } from "./InputNumberCustom";
import { SelectCustom } from "./SelectCustom";
import { FaFileArrowDown } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { CgClose } from "react-icons/cg";
import { InputCustom } from "./InputCustom";
import clsx from "clsx";
import { BaseDataTable } from "@/model/BaseDataTable";
import { Key } from "antd/es/table/interface";

import { LoadingOutlined } from "@ant-design/icons";
import Spin1 from "./spin/Spin1";
const MotionTh = motion.th;
// Interface mở rộng props
export interface ExtendFunction<T> {
  buttonAddTitle?: string;
  size?: "small" | "middle" | "large";
  toggleViewMode?: (mode: boolean) => void;
  disableAddData?: boolean;
  handleUpdateDataSource?: (data: T[]) => void;
  buttonReloadFunction?: () => void;
  isSupportExport?: boolean;
  isSupportZoom?: boolean;
  isExportFromServer?: boolean;
  handleExportData?: () => void;
  disableExportData?: boolean;
  andOn?: "table" | "drawer" | "page";
  formOnDrawer?: ReactNode;
  handleConfirm?: () => void;
  quickSearch?: boolean;
  handleQuickSearch?: (keyword: string) => void;
}

const customIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;
// Props cho TableCustom
export interface TablePropsCustom<T> extends TableProps<T> {
  dataSource?: T[];
  extendFunction?: ExtendFunction<T>;
  columns: ColumnTypeCustom<T>[];
  columnsEdit: ColumnTypeCustom<T>[];
  fixedCollap?: boolean;
  viewMode?: boolean;
  isSupportMultiSelect?: boolean;
  tableName: string;
  scrollPx?: number | 0;
}
export interface ColumnTypeCustom<T> extends ColumnType<T> {
  sortNumber?: number;
  children?: ColumnTypeCustom<T>[];
  isOpenChildren?: boolean;
}
// Component TableCustom
export const TableCustom = <T extends BaseDataTable>({
  style,
  columns,
  columnsEdit,
  extendFunction,
  fixedCollap = false,
  viewMode,
  loading,
  dataSource,
  tableName,
  isSupportMultiSelect,
  scrollPx,
  ...restProps
}: TablePropsCustom<T>) => {
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns || []);
  const [setting, setSetting] = useState(columns || []);
  const [activeCollap, setActiveCollap] = useState(["1"]);
  const [isEditAddBtn, setIsEditAddBtn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBeforeConfirmModalOpen, setIsBeforeConfirmModalOpen] =
    useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as Key[]);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Logic setting table
  const handleChangeCollap = (value: string[]) => {
    if (fixedCollap) {
      return;
    }
    setActiveCollap(value);
  };
  const handleShowSetting = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsShowSetting(true);
  };
  const handleCloseSetting = () => {
    setIsShowSetting(false);
  };
  const handleZoom = (zoom: boolean) => {
    setIsZoomOut(zoom);
  };

  const handleChangeColumn = (isChecked: boolean, columnKey: string) => {
    if (!columns) return;

    if (isChecked) {
      // Thêm lại cột nếu đang bị ẩn
      const colToAdd = columns.find((col) => col.key === columnKey);
      if (colToAdd) {
        const updated = [...setting, colToAdd].sort((a, b) => {
          const sortA = a.sortNumber ?? Number.POSITIVE_INFINITY;
          const sortB = b.sortNumber ?? Number.POSITIVE_INFINITY;
          return sortA - sortB;
        });
        setSetting(updated);
      }
    } else {
      // Ẩn cột
      const updated = setting
        .filter((col) => col.key !== columnKey)
        .sort((a, b) => {
          const sortA = a.sortNumber ?? Number.POSITIVE_INFINITY;
          const sortB = b.sortNumber ?? Number.POSITIVE_INFINITY;
          return sortA - sortB;
        });
      setSetting(updated);
    }
  };
  const handleChangeColumnSize = (
    e: number,
    col: ColumnType<T>,
    index: number
  ) => {
    if (e === null || e === undefined) return;

    const newColumns = [...setting];
    newColumns[index] = {
      ...newColumns[index],
      width: e,
    };
    setSetting(newColumns);
  };
  const handleUpdateSettingTable = () => {
    setVisibleColumns(setting);
    handleCloseSetting();
  };
  const getItemsCollapse = () => {
    return columns?.map((col: ColumnType<T>, index: number) => {
      return {
        key: col.key,
        label: `Cột ${col.title}`,
        children: (
          <Row gutter={16}>
            <Col
              span={24}
              style={{
                marginBottom: "12px",
              }}
            >
              <CheckBoxCustom
                checked={setting.some((c) => c.key === col.key)} // Hiển thị đúng trạng thái
                onChange={(e) => {
                  handleChangeColumn(e.target.checked, col.key as string);
                }}
                title={"Hiển thị"}
              />
            </Col>
            <Col span={12}>
              <p
                style={{
                  marginBottom: "4px",
                }}
              >
                Chiều rộng cột
              </p>
              <InputNumberCustom
                style={{
                  width: "100%",
                  height: 30,
                }}
                min={50}
                max={1000}
                value={col.width as number}
                placeholder="Nhập chiều rộng cột"
                onChange={(e) => {
                  handleChangeColumnSize(e as number, col, index);
                }}
              />
            </Col>
            <Col span={12}>
              <p
                style={{
                  marginBottom: "4px",
                }}
              >
                Lọc và sắp xếp
              </p>
              <SelectCustom
                style={{
                  width: "100%",
                  height: "unset",
                }}
                mode="multiple"
                placeholder="Chọn bộ lọc"
                onChange={(e) => {
                  console.error(e);
                }}
                options={[
                  {
                    value: "sorted",
                    label: "Sắp xếp theo giá trị",
                  },
                  {
                    value: "filter",
                    label: "Lọc theo giá trị",
                  },
                ]}
              />
            </Col>
          </Row>
        ),
      };
    });
  };

  // Logic data
  const handleEditAddDataTable = () => {
    setIsEditAddBtn(true);
    if (extendFunction?.toggleViewMode) {
      extendFunction.toggleViewMode(false);
    }
    if (extendFunction?.andOn === "table") {
      // Mở nút thêm dòng và mở lại hết các cột nếu đang bị ẩn
      setVisibleColumns(columns);
    }
    if (extendFunction?.andOn === "drawer") {
      // mở drawer
    }
    if (extendFunction?.andOn === "page") {
      // điều hướng trang tạo mới
    }
  };
  const addRowData = () => {
    if (extendFunction) {
      if (extendFunction.handleUpdateDataSource) {
        dataSource?.unshift({
          rowUUID: uuidv4(),
          isNewRow: true,
        } as T);
        extendFunction.handleUpdateDataSource(dataSource as []);
      }
    }
  };
  const handleCloseEditAddTable = () => {
    let isHasChange = false;
    for (const data of dataSource || []) {
      if (data.isEdited || data.isNewRow) {
        isHasChange = true;
        break;
      }
    }
    if (isHasChange) {
      showModal();
    } else {
      handleClose(isHasChange);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = (isHasChange: boolean) => {
    setIsModalOpen(false);
    setIsEditAddBtn(false);
    if (isHasChange) {
      if (extendFunction?.buttonReloadFunction) {
        extendFunction.buttonReloadFunction();
      }
    }
    if (extendFunction?.toggleViewMode) {
      extendFunction.toggleViewMode(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleBeforeConfirm = () => {
    handleOpenBeforeConfirm();
  };
  const handleConfirm = () => {
    try {
      if (extendFunction) {
        if (extendFunction.handleConfirm) {
          extendFunction.handleConfirm();
        }
      }
    } catch (e) {
      console.error(e);
      messageApi.open({
        type: "error",
        content: "e",
      });
    } finally {
      handleCloseBeforeConfirm();
      setIsEditAddBtn(false);
      if (extendFunction?.toggleViewMode) {
        extendFunction.toggleViewMode(true);
      }
    }
  };
  const handleCloseBeforeConfirm = () => {
    setIsBeforeConfirmModalOpen(false);
  };
  const handleOpenBeforeConfirm = () => {
    setIsBeforeConfirmModalOpen(true);
  };

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getScroller = () => {
    const root = wrapperRef.current;
    if (!root) return null;
    // v5: .ant-table-content là scroller ngang chính; fallback .ant-table-body
    return (
      (root.querySelector(".ant-table-content") as HTMLElement) ||
      (root.querySelector(".ant-table-body") as HTMLElement)
    );
  };

  useEffect(() => {
    setVisibleColumns(viewMode ? columns : columnsEdit);

    const scroller = getScroller();
    if (scroller) {
      scroller.scrollTo({ left: scrollPx, behavior: "smooth" });
    }
  }, [viewMode, columns]);

  return (
    <div className={clsx("table-custom-container", viewMode && "view-mode")}>
      {contextHolder}
      {/* ZoomOut */}
      {isZoomOut && (
        <Modal
          title={`Dữ liệu ${tableName}`}
          onCancel={() => {
            handleZoom(false);
          }}
          className={clsx("zoom-out-table")}
          open={isZoomOut}
          footer={null}
        >
          <AnimatePresence mode="wait">
            <motion.div>
              <Table<T>
                rowKey="rowUUID"
                className={clsx("table-custom")}
                loading={{
                  spinning: loading as boolean | undefined,
                  indicator: <Spin1 />,
                }}
                style={{ ...style }}
                bordered
                columns={visibleColumns}
                dataSource={dataSource?.filter((row: T) => {
                  if (row.isDeleted) {
                    return false;
                  }
                  if (!row.rowUUID) {
                    row.rowUUID = uuidv4();
                  }
                  return true;
                })}
                scroll={{ x: "100%" }}
                {...restProps}
                components={{
                  header: {
                    cell: (props: object) => (
                      <AnimatePresence mode="popLayout">
                        <MotionTh
                          {...props}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      </AnimatePresence>
                    ),
                  },
                }}
              />
            </motion.div>
          </AnimatePresence>
        </Modal>
      )}
      {/* ZoomOut */}

      <CollapseCustom
        activeKey={activeCollap}
        onChange={handleChangeCollap}
        items={[
          {
            key: "1",
            label: "Kết quả",
            children: (
              <>
                <AnimatePresence mode="sync">
                  <motion.div
                    ref={wrapperRef}
                    layout
                    initial={false}
                    exit={{}} // không animate exit để tránh flicker
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <Table<T>
                      rowKey="rowUUID"
                      className="table-custom"
                      loading={{
                        spinning: loading as boolean | undefined,
                        indicator: <Spin1 />
                      }}
                      style={{ ...style }}
                      rowSelection={
                        isSupportMultiSelect ? rowSelection : undefined
                      }
                      bordered
                      columns={visibleColumns}
                      dataSource={dataSource?.filter((row: T) => {
                        if (row.isDeleted) {
                          return false;
                        }
                        if (!row.rowUUID) {
                          row.rowUUID = uuidv4();
                        }
                        return true;
                      })}
                      scroll={{ x: "100%" }}
                      {...restProps}
                    />
                  </motion.div>
                </AnimatePresence>
              </>
            ),
            extra: (
              <>
                {extendFunction && activeCollap.length !== 0 && (
                  <Row align="middle">
                    <Col>
                      {extendFunction.quickSearch && (
                        <InputCustom
                          style={{
                            width: "200px",
                          }}
                          prefix={<IoSearchSharp />}
                          placeholder="Tìm kiếm nhanh..."
                          onPressEnter={(
                            e: KeyboardEvent<HTMLInputElement>
                          ) => {
                            if (extendFunction.handleQuickSearch) {
                              extendFunction.handleQuickSearch(
                                e.currentTarget.value
                              );
                            }
                          }}
                        />
                      )}

                      {isEditAddBtn && (
                        <>
                          <Modal
                            title={
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <WarningOutlined
                                  style={{ color: "#faad14", fontSize: 26 }}
                                />
                                <span>Dữ liệu thay đổi chưa được lưu!</span>
                              </div>
                            }
                            open={isModalOpen}
                            centered
                            width={400}
                            footer={
                              <>
                                <div>
                                  <ButtonCustom
                                    title={"Giữ và ở lại"}
                                    onClick={handleCancel}
                                    type="primary"
                                    style={{
                                      marginLeft: "8px",
                                    }}
                                  />
                                  <ButtonCustom
                                    title={"Thoát và bỏ thay đổi"}
                                    style={{
                                      marginLeft: "8px",
                                    }}
                                    onClick={() => {
                                      handleClose(true);
                                    }}
                                    danger
                                  />
                                </div>
                              </>
                            }
                          >
                            <p>
                              Các thay đổi ở bảng {tableName} chưa được lưu. Bạn
                              muốn bỏ những thay đổi này
                            </p>
                          </Modal>
                          <ButtonCustom
                            icon={<CgClose />}
                            size={extendFunction.size || "middle"}
                            title={"Huỷ"}
                            style={{
                              marginLeft: "8px",
                            }}
                            onClick={handleCloseEditAddTable}
                            danger
                          />
                          {extendFunction.andOn === "table" && (
                            <ButtonCustom
                              icon={<FaPlus />}
                              size={extendFunction.size || "middle"}
                              title={
                                extendFunction.buttonAddTitle || "Thêm dòng"
                              }
                              onClick={addRowData}
                              disabled={extendFunction.disableAddData}
                              type="primary"
                              style={{
                                marginLeft: "8px",
                              }}
                            />
                          )}
                          <Modal
                            title={
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <InfoCircleOutlined
                                  style={{ color: "#05428c", fontSize: 26 }}
                                />
                                <span>Lưu các thay đổi!</span>
                              </div>
                            }
                            open={isBeforeConfirmModalOpen}
                            centered
                            width={400}
                            footer={
                              <>
                                <div>
                                  <ButtonCustom
                                    title={"Chỉnh sửa tiếp"}
                                    style={{
                                      marginLeft: "8px",
                                    }}
                                    onClick={handleCloseBeforeConfirm}
                                  />
                                  <ButtonCustom
                                    title={"Lưu thay đổi"}
                                    onClick={handleConfirm}
                                    type="primary"
                                    style={{
                                      marginLeft: "8px",
                                    }}
                                  />
                                </div>
                              </>
                            }
                          >
                            <p>
                              Bạn muốn lưu những thay đổi ở bảng {tableName}?
                            </p>
                          </Modal>
                          <ButtonCustom
                            icon={<SiTicktick />}
                            size={extendFunction.size || "middle"}
                            title={"Xác nhận"}
                            style={{
                              marginLeft: "8px",
                            }}
                            onClick={handleBeforeConfirm}
                            type="primary"
                          />
                        </>
                      )}

                      {!isEditAddBtn && (
                        <ButtonCustom
                          icon={<FaPlus />}
                          size={extendFunction.size || "middle"}
                          title={
                            extendFunction.buttonAddTitle || "Chỉnh sửa tạo mới"
                          }
                          onClick={handleEditAddDataTable}
                          type="primary"
                          style={{
                            marginLeft: "8px",
                          }}
                        />
                      )}
                      {extendFunction.isSupportExport && !isEditAddBtn && (
                        <ButtonCustom
                          size={extendFunction.size || "middle"}
                          title="Export"
                          onClick={extendFunction.handleExportData}
                          style={{
                            marginLeft: "8px",
                          }}
                          disabled={
                            extendFunction.disableExportData ||
                            !extendFunction.handleExportData
                          }
                          icon={<FaFileArrowDown />}
                        />
                      )}
                      <Tooltip
                        title={
                          isEditAddBtn
                            ? "Đang ở chế độ tạo sửa không cho phép reload dữ liệu!"
                            : "Reload dữ liệu"
                        }
                      >
                        <ButtonCustom
                          style={{
                            marginLeft: "8px",
                          }}
                          disabled={isEditAddBtn}
                          onClick={extendFunction.buttonReloadFunction}
                          size={extendFunction.size || "middle"}
                          type="link"
                          shape="circle"
                          icon={<SyncOutlined />}
                        />
                      </Tooltip>
                      {extendFunction.isSupportZoom && (
                        <Tooltip
                          title={
                            isEditAddBtn
                              ? "Đang ở chế độ tạo sửa không cho phép zoom!"
                              : "Zoom toàn màn hình!"
                          }
                        >
                          <ButtonCustom
                            style={{
                              marginLeft: "8px",
                            }}
                            disabled={isEditAddBtn}
                            onClick={() => {
                              handleZoom(true);
                            }}
                            size={extendFunction.size || "middle"}
                            type="link"
                            shape="circle"
                            icon={<MdOutlineZoomOutMap />}
                          />
                        </Tooltip>
                      )}
                      <Tooltip
                        title={
                          isEditAddBtn
                            ? "Đang ở chế độ tạo sửa không cho phép cài đặt!"
                            : "Cài đặt bảng dữ liệu!"
                        }
                      >
                        <ButtonCustom
                          style={{
                            marginLeft: "8px",
                          }}
                          disabled={isEditAddBtn}
                          onClick={handleShowSetting}
                          size={extendFunction.size || "middle"}
                          type="link"
                          shape="circle"
                          icon={<IoSettingsSharp />}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                )}
              </>
            ),
          },
        ]}
        noBorder={true}
      />

      {extendFunction?.andOn === "drawer" && (
        <Drawer
          title="Basic Drawer"
          closable={{ "aria-label": "Close Button" }}
          open={true}
        >
          {extendFunction.formOnDrawer}
        </Drawer>
      )}
      {extendFunction && (
        <Drawer
          title="Cấu hình bảng dữ liệu"
          closable={{ "aria-label": "Close Button" }}
          open={isShowSetting}
          onClose={handleCloseSetting}
          width={600}
          footer={
            <div style={{ textAlign: "right" }}>
              <ButtonCustom
                onClick={handleCloseSetting}
                style={{ marginRight: 8 }}
                title="Hủy"
              ></ButtonCustom>
              <ButtonCustom
                type="primary"
                onClick={handleUpdateSettingTable}
                title="Lưu"
              ></ButtonCustom>
            </div>
          }
        >
          <p
            style={{
              marginBottom: "12px",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Cấu hình cột
          </p>
          <CollapseCustom items={getItemsCollapse()} />
        </Drawer>
      )}
    </div>
  );
};

export const getScrollPx = (
  key: string,
  columns: ColumnTypeCustom<object>[]
): number => {
  let px = 0;
  for (const col of columns) {
    if (col.dataIndex === key) {
      px -= col.width as number;
      break;
    }
    if (col.width) {
      px += col.width as number;
    }
  }
  return px;
};
