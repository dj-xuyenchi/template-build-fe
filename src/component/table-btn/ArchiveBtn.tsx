import { Tooltip } from "antd";
import { ButtonCustom } from "../ButtonCustom";
import { FiArchive } from "react-icons/fi";
import Image from "next/image";
import clsx from "clsx";
import noPermission from "../../../public/no-permission.png";

export interface ArchiveBtnProps {
  handleArchive: () => void;
  disable: boolean;
}

export const ArchiveBtn = ({ handleArchive, disable }: ArchiveBtnProps) => {
  return (
    <Tooltip placement="top" title={disable ? "Không có quyền lưu trữ" : "Lưu trữ"}>
      <ButtonCustom
        icon={
          <>
            <FiArchive />
            {disable && (
              <div className={clsx("disable")}>
                <Image src={noPermission} alt="no-permission" />
              </div>
            )}
          </>
        }
        className="archive-btn"
        onClick={handleArchive}
        disabled={disable}
        type="text"
      ></ButtonCustom>
    </Tooltip>
  );
};
