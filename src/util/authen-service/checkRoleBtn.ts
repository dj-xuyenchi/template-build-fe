import store from "@/store/store";

export const hasRole = (btnCodes: string[]): boolean => {
    // return true;
    try {
        const global = store.getState().global;

        // Nếu chưa có info user → cho phép (tuỳ policy)
        if (!global?.userApp?.userRole) {
            return true;
        }

        const userRoles: string[] = global.userApp.userRole;
        // ví dụ tạm
        // const userRoles = ['ADMIN'];

        // Nếu button không yêu cầu role → cho phép
        if (!btnCodes || btnCodes.length === 0) {
            return true;
        }

        // User có ít nhất 1 role nằm trong btnCodes
        return userRoles.some(role => btnCodes.includes(role));
    } catch (e) {
        console.error("Lỗi kiểm tra quyền sử dụng nút!");

        return false;
    }
}