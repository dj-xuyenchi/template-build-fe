import { Tooltip } from "antd";
import { ButtonCustom } from "../ButtonCustom";
import { FormOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Image from "next/image";
import noPermission from "../../../public/no-permission.png";

export interface EditBtnProps {
  handleEdit: () => void;
  disable?: boolean;
}

export const EditBtn = ({ handleEdit, disable }: EditBtnProps) => {
  return (
    <Tooltip
      placement="top"
      title={disable ? "Không có quyền chỉnh sửa" : "Chỉnh sửa"}
    >
      <ButtonCustom
        icon={
          <>
            <FormOutlined />
            {disable && (
              <div className={clsx("disable")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </>
        }
        disabled={disable}
        className="edit-btn"
        onClick={handleEdit}
        type="text"
      ></ButtonCustom>
    </Tooltip>
  );
};
