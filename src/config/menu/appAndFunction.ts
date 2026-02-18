import {
  API,
  APPLICATION,
  APPLICATION_FUNCTION,
  APPLY_ROLE,
  CMS_ROLE,
  FUNCTION,
} from "@/constant/keyCodeMenu";
import { createElement } from "react";
import { BsPersonFillLock } from "react-icons/bs";
import { RiAppsFill } from "react-icons/ri";
import { SiApplearcade } from "react-icons/si";
import { IoIosApps } from "react-icons/io";
import { AiOutlineApi } from "react-icons/ai";
export const appAndFunction = {
  key: APPLICATION_FUNCTION,
  icon: createElement(RiAppsFill),
  label: "Ứng dụng & chức năng",
  children: [
    {
      key: APPLICATION,
      icon: createElement(IoIosApps),
      label: "Ứng dụng",
      childFeatures: [
        {
          value: APPLICATION,
          label: "Quản lý ứng dụng",
        },
      ],
    },
    {
      key: FUNCTION,
      icon: createElement(SiApplearcade),
      label: "Chức năng",
      childFeatures: [
        {
          value: FUNCTION,
          label: "Quản lý chức năng",
        },
      ],
    },
    {
      key: API,
      icon: createElement(AiOutlineApi),
      label: "Api",
      childFeatures: [
        {
          value: API,
          label: "Quản lý API",
        },
      ],
    },
    {
      key: CMS_ROLE,
      icon: createElement(BsPersonFillLock),
      label: "Quản lý phân quyền",
      childFeatures: [
        {
          value: CMS_ROLE,
          label: "Quản lý quyền",
        },
        {
          value: APPLY_ROLE,
          label: "Phân quyền người dùng",
        },
      ],
    },
  ],
};
