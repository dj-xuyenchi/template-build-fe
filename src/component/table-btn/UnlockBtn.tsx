import { Tooltip } from "antd";
import { ButtonCustom } from "../ButtonCustom";

import { FaLockOpen } from "react-icons/fa";
import Image from "next/image";
import clsx from "clsx";
import noPermission from "../../../public/no-permission.png";

export interface UnlockBtnProps {
  handleUnlock: () => void;
  disable: boolean;
}

export const UnlockBtn = ({ handleUnlock, disable }: UnlockBtnProps) => {
  return (
    <Tooltip
      placement="top"
      title={disable ? "Không có quyền mở khóa" : "Mở khóa"}
    >
      <ButtonCustom
        icon={
          <>
            <FaLockOpen />
            {disable && (
              <div className={clsx("disable")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </>
        }
        className="unlock-btn"
        onClick={handleUnlock}
        disabled={disable}
        type="text"
      ></ButtonCustom>
    </Tooltip>
  );
};
