import {
  API,
  APPLICATION,
  APPLICATION_FUNCTION,
  APPLY_ROLE,
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
      key: APPLY_ROLE,
      icon: createElement(BsPersonFillLock),
      label: "Phân quyền",
      childFeatures: [
        {
          value: APPLY_ROLE,
          label: "Phân quyền",
        },
      ],
    },
  ],
};
