import store from "@/store/store";

export const allowBtnCode = (btnCode: string): boolean => {
    // return true;
    try {
        const global = store.getState().global;

        // Chưa có thông tin quyền thì mặc định không có quyền
        if (!global?.userApp.btnCodes) {
            return false;
        }

        const allowBtnCode: string[] = global.userApp.btnCodes;

        if (!allowBtnCode || allowBtnCode.length === 0) {
            return false;
        }
        // Mã code truyền vào tồn tại trong danh sách mã code được phép sử dụng → có quyền sử dụng nút
        return allowBtnCode.includes(btnCode);
    } catch (e) {
        console.error("Lỗi kiểm tra quyền sử dụng nút! {}", e);
        return false;
    }
}