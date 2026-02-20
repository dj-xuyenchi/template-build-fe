export interface FeatureAsMenu {
    children?: FeatureAsMenu[] | null;
    key: string;
    label: string;
    parentId: number | null;
    icon: string;
}