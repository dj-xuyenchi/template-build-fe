import { Dropdown, MenuProps, Space, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { FormOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { FiArchive } from "react-icons/fi";
import clsx from "clsx";
import Image from "next/image";
import noPermission from "../../../public/no-permission.png";

export interface ComboActionProps {
  handleView?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleArchive?: () => void;
  disableView?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableArchive?: boolean;
}

export const ComboAction = ({
  handleView,
  disableView,
  handleEdit,
  disableEdit,
  handleDelete,
  disableDelete,
  handleArchive,
  disableArchive,
}: ComboActionProps) => {
  const items: MenuProps["items"] = [
    handleView
      ? {
        label: (
          <>
            <Tooltip
              placement="top"
              title={disableView ? "Không có quyền xem chi tiết" : "Xem chi tiết"}
            >
              <div>Xem chi tiết</div>
            </Tooltip>
          </>
        ),
        key: "1",
        icon: (
          <div className="combo-view">
            <EyeOutlined />
            {disableEdit && (
              <div className={clsx("disable-combo")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </div>
        ),
        disabled: disableView,
        onClick: handleView
      }
      : null,
    handleEdit
      ? {
        label: (
          <>
            <Tooltip
              placement="top"
              title={disableEdit ? "Không có quyền chỉnh sửa" : "Chỉnh sửa"}
            >
              <div>Chỉnh sửa</div>
            </Tooltip>
          </>
        ),
        key: "2",
        icon: (
          <div className="combo-edit">
            <FormOutlined />
            {disableEdit && (
              <div className={clsx("disable-combo")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </div>
        ),
        disabled: disableEdit,
        onClick: handleEdit
      }
      : null,
    handleDelete
      ? {
        label: (
          <>
            <Tooltip
              placement="top"
              title={disableDelete ? "Không có quyền xóa" : "Xóa"}
            >
              <div>Xóa</div>
            </Tooltip>
          </>
        ),
        key: "3",
        icon: (
          <div className="combo-delete">
            <DeleteOutlined />
            {disableEdit && (
              <div className={clsx("disable-combo")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </div>
        ),
        disabled: disableDelete,
        onClick: handleDelete
      }
      : null,
    handleArchive
      ? {
        label: (
          <>
            <Tooltip
              placement="top"
              title={disableArchive ? "Không có quyền lưu trữ" : "Lưu trữ"}
            >
              <div>Lưu trữ</div>
            </Tooltip>
          </>
        ),
        key: "4",
        icon: (
          <div className="combo-archive">
            <FiArchive />
            {disableEdit && (
              <div className={clsx("disable-combo")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </div>
        ),
        disabled: disableArchive,
        onClick: handleArchive
      }
      : null,
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]} className="combo-action">
      <a onClick={(e) => e.preventDefault()}>
        <Space
          style={{
            color: "#05428C",
          }}
        >
          Thao tác
        </Space>
      </a>
    </Dropdown>
  );
};
