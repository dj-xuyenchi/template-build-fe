import { BaseDataTable, reIndexDataTable } from "@/model/BaseDataTable";

export const orderByCreatedAt = <T extends BaseDataTable>(data: T[]): T[] => {
  if (!data || data.length === 0) {
    return [];
  }
  return reIndexDataTable(
    data.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : null;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : null;

      if (dateA === null && dateB === null) return 0; // Cả hai cùng null -> giữ nguyên
      if (dateA === null) return 1; // a null -> cho xuống dưới
      if (dateB === null) return -1; // b null -> cho xuống dưới

      return dateB - dateA; // Giảm dần: mới trước, cũ sau
    }),
  );
};
export const orderByUpdatedAt = <T extends BaseDataTable>(data: T[]): T[] => {
  if (!data || data.length === 0) {
    return [];
  }
  return reIndexDataTable(
    data.sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : null;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : null;

      if (dateA === null && dateB === null) return 0; // Cả hai cùng null -> giữ nguyên
      if (dateA === null) return 1; // a null -> cho xuống dưới
      if (dateB === null) return -1; // b null -> cho xuống dưới

      return dateB - dateA; // Giảm dần: mới trước, cũ sau
    }),
  );
};

export const orderByField = <T extends BaseDataTable>(
  data: T[],
  fieldName: keyof T,
  order: "asc" | "desc" = "desc",
): T[] => {
  if (!data || data.length === 0) return [];

  return reIndexDataTable(
    data.sort((a, b) => {
      const valueA = a[fieldName];
      const valueB = b[fieldName];

      // Chỉ parse nếu value là string hoặc number, khác thì bỏ qua
      const dateA =
        typeof valueA === "string" || typeof valueA === "number"
          ? new Date(valueA).getTime()
          : valueA instanceof Date
            ? valueA.getTime()
            : null;

      const dateB =
        typeof valueB === "string" || typeof valueB === "number"
          ? new Date(valueB).getTime()
          : valueB instanceof Date
            ? valueB.getTime()
            : null;

      if (dateA === null && dateB === null) return 0;
      if (dateA === null) return 1;
      if (dateB === null) return -1;

      return order === "desc" ? dateB - dateA : dateA - dateB;
    }),
  );
};
