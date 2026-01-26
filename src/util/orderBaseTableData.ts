import { BaseDataTable } from "@/model/BaseDataTable";

export const orderByCreatedAt = <T extends BaseDataTable>(data: T[]): T[] => {
    if (!data || data.length === 0) {
        return []
    }
    return data.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : null;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : null;

        if (dateA === null && dateB === null) return 0; // Cả hai cùng null -> giữ nguyên
        if (dateA === null) return 1;  // a null -> cho xuống dưới
        if (dateB === null) return -1; // b null -> cho xuống dưới

        return dateB - dateA; // Giảm dần: mới trước, cũ sau
    });
}