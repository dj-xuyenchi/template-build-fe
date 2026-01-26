import { Tooltip } from "antd";
import { ButtonCustom } from "../ButtonCustom";
import { TbReload } from "react-icons/tb";
import Image from "next/image";
import clsx from "clsx";
import noPermission from "../../../public/no-permission.png";

export interface ReOpenBtnProps {
  handleReopen: () => void;
  disable: boolean;
}

export const ReOpenBtn = ({ handleReopen, disable }: ReOpenBtnProps) => {
  return (
    <Tooltip
      placement="top"
      title={disable ? "Không có quyền mở lại" : "Mở lại"}
    >
      <ButtonCustom
        icon={
          <>
            <TbReload />
            {disable && (
              <div className={clsx("disable")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </>
        }
        className="reopen-btn"
        onClick={handleReopen}
        disabled={disable}
        type="text"
      ></ButtonCustom>
    </Tooltip>
  );
};
