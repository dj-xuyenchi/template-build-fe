import { appAndFunction } from "./appAndFunction";

import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import { createElement } from "react";
import { FeatureDTO } from "@/model/feature/FeatureDTO";

const iconLibraries = {
    Ri: RiIcons,
    Io: IoIcons,
    Bs: BsIcons,
};

type IconLibraryKey = keyof typeof iconLibraries;
const getIcon = (iconName: string) => {
    if (!iconName) return null;

    const prefix = iconName.slice(0, 2) as IconLibraryKey;

    const lib = iconLibraries[prefix];

    if (!lib) return null;

    const IconComponent = lib[
        iconName as keyof typeof lib
    ];

    return IconComponent ? createElement(IconComponent) : null;
}
export const buildMenu = (features: FeatureDTO[]) => {
    type MenuNode = {
        key: string;
        icon: React.ReactNode;
        label: string;
        children: MenuNode[] | null;
        parentId: number | null;
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

            parent.children.push(node);
        }
    });

    return roots;
}