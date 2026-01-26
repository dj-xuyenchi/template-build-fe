import dayjs from "dayjs";

export const formatDate = (date: Date, type: string): string => {
    if (!date) {
        return '';
    }
    return dayjs(date).format(type);
};
