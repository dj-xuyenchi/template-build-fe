import dayjs from "dayjs";
import "dayjs/locale/vi";

export const formatDate = (date: Date, type: string): string => {
    if (!date) {
        return '';
    }
    return dayjs(date).format(type);
};
export const formatDateWithDayVN = (date: Date): string => {
    if (!date) {
        return '';
    }
    dayjs.locale("vi");

    return dayjs(date).format("dddd, DD/MM/YYYY");
};

export const toDateSendBE = (date: dayjs.Dayjs | null): string | undefined => {
    if (!date) {
        return undefined;
    }
    return date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}