export interface BaseDataTable {
  isEdited?: boolean | false;
  isNewRow?: boolean | false;
  isDeleted?: boolean | false;
  rowUUID?: string;
  createdAt: Date
}


export const ACTIVE = "O"
export const CLOSE = "C"
export const DELETE = "D"