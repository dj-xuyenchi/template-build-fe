import store from "@/store/store";

export const isNotHasRole = (btnCode: string): boolean => {
    // try {
    //     const global = store.getState().global;
    //     if (!global || !global.btnRole) {
    //         return true;
    //     }
    //     const btnRole = global.btnRole.btnRole.get(btnCode);

    //     // const userRole = appSetting.userRole 
    //     const userRole = ['ADMIN']

    //     if (btnRole && userRole) {
    //         // Kiểm tra xem có role nào của user trùng với role của btnCode
    //         const res = userRole.some((role: string) => btnRole.includes(role));
    //         return !res
    //     }
    // } catch (e) {
    //     console.error("Loi role btn");
    // }
    // return true;
    return false;
}