import { Tooltip } from "antd";
import { ButtonCustom } from "../ButtonCustom";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import noPermission from "../../../public/no-permission.png";
import clsx from "clsx";

export interface DeleteBtnProps {
  handleDelete: () => void;
  disable: boolean;
}

export const DeleteBtn = ({ handleDelete, disable }: DeleteBtnProps) => {
  return (
    <Tooltip placement="top"
      title={disable ? "Không có quyền xóa" : "Xóa"}
    >
      <ButtonCustom
        icon={
          <>
            <DeleteOutlined />
            {disable && (
              <div className={clsx("disable")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </>
        }
        disabled={disable}
        className="delete-btn"
        onClick={handleDelete}
        type="text"
      ></ButtonCustom>
    </Tooltip>
  );
};
