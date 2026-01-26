import { Tooltip } from "antd";
import { ButtonCustom } from "../ButtonCustom";
import { EyeOutlined } from "@ant-design/icons";
import noPermission from "../../../public/no-permission.png";
import clsx from "clsx";
import Image from "next/image";

export interface ViewBtnProps {
  handleView: () => void;
  disable?: boolean;
}

export const ViewBtn = ({ handleView, disable }: ViewBtnProps) => {
  return (
    <Tooltip
      placement="top"
      title={disable ? "Không có quyền xem nội dung này!" : "Xem chi tiết"}
    >
      <ButtonCustom
        disabled={disable}
        icon={
          <>
            <EyeOutlined />
            {disable && (
              <div className={clsx("disable")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </>
        }
        className={clsx("view-btn")}
        onClick={handleView}
        type="text"
      ></ButtonCustom>
    </Tooltip>
  );
};
