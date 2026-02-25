export interface BaseDataTable {
  isEdited?: boolean | false;
  isNewRow?: boolean | false;
  isDeleted?: boolean | false;
  rowUUID?: string;
  createdAt: Date;
  indexCountNumber?: number
}
export const reIndexDataTable = <T extends BaseDataTable>(data: T[]): T[] => {
  return data.map((item, index) => ({
    ...item,
    indexCountNumber: index + 1,
  }));
}

export const ACTIVE = "ACTIVE";
export const CLOSE = "CLOSE";
export const DELETE = "DELETE";