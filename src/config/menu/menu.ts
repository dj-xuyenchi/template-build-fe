import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { createElement } from "react";
import { FeatureDTO } from "@/model/feature/FeatureDTO";

const iconLibraries = {
  Ri: RiIcons,
  Io: IoIcons,
  Bs: BsIcons,
  Md: MdIcons,
};

type IconLibraryKey = keyof typeof iconLibraries;
const getIcon = (iconName: string) => {
  if (!iconName) return null;

  const prefix = iconName.slice(0, 2) as IconLibraryKey;

  const lib = iconLibraries[prefix];

  if (!lib) return null;

  const IconComponent = lib[iconName as keyof typeof lib];

  return IconComponent ? createElement(IconComponent) : null;
};
export const buildMenu = (features: FeatureDTO[]) => {
  type MenuNode = {
    key: string;
    icon: React.ReactNode;
    label: string;
    children: MenuNode[] | null;
    subMenu: MenuNode[] | null;
    parentId: number | null;
    isSubMenu: boolean;
  };

  const map: Record<number, MenuNode> = {};
  const roots: MenuNode[] = [];

  // Bước 1: Tạo node và map theo featureId
  features.forEach((f) => {
    map[f.featureId] = {
      key: f.feUri,
      icon: getIcon(f.icon),
      label: f.feLabel,
      parentId: f.parentId,
      children: null, // mặc định null
      subMenu: null, // mặc định null
      isSubMenu: f.isSubMenu,
    };
  });

  // Bước 2: Build tree theo parentId
  features.forEach((f) => {
    const node = map[f.featureId];

    if (f.parentId == null) {
      roots.push(node);
    } else {
      const parent = map[f.parentId];

      if (!parent) {
        return;
      }

      if (!parent.children) {
        parent.children = [];
      }
      if (!parent.subMenu) {
        parent.subMenu = [];
      }
      if (node.isSubMenu) {
        parent.subMenu.push(node);
      } else {
        parent.children.push(node);
      }
      if (parent.children.length === 0) {
        parent.children = null;
      }
      if (parent.subMenu.length === 0) {
        parent.subMenu = null;
      }
    }
  });

  return roots;
};
