import { Tooltip } from "antd";
import { ButtonCustom } from "../ButtonCustom";
import { FaLock } from "react-icons/fa";

import Image from "next/image";
import clsx from "clsx";
import noPermission from "../../../public/no-permission.png";

export interface LockBtnProps {
  handleLock: () => void;
  disable: boolean;
}

export const LockBtn = ({ handleLock, disable }: LockBtnProps) => {
  return (
    <Tooltip placement="top" title={disable ? "Không có quyền khóa" : "Khóa"}>
      <ButtonCustom
        icon={
          <>
            <FaLock />
            {disable && (
              <div className={clsx("disable")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </>
        }
        className="lock-btn"
        onClick={handleLock}
        disabled={disable}
        type="text"
      ></ButtonCustom>
    </Tooltip>
  );
};
