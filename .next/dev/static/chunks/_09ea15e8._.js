(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/styles.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "styles-module-scss-module__ie2kxq__active",
  "antAvatar": "styles-module-scss-module__ie2kxq__antAvatar",
  "appBreadcrumb": "styles-module-scss-module__ie2kxq__appBreadcrumb",
  "appTitle": "styles-module-scss-module__ie2kxq__appTitle",
  "avatarContainer": "styles-module-scss-module__ie2kxq__avatarContainer",
  "breadcrumbSubfunction": "styles-module-scss-module__ie2kxq__breadcrumbSubfunction",
  "content": "styles-module-scss-module__ie2kxq__content",
  "contentNoti": "styles-module-scss-module__ie2kxq__contentNoti",
  "contentWrapper": "styles-module-scss-module__ie2kxq__contentWrapper",
  "hasRead": "styles-module-scss-module__ie2kxq__hasRead",
  "headerWrapper": "styles-module-scss-module__ie2kxq__headerWrapper",
  "noData": "styles-module-scss-module__ie2kxq__noData",
  "notiBell": "styles-module-scss-module__ie2kxq__notiBell",
  "notiContainer": "styles-module-scss-module__ie2kxq__notiContainer",
  "notiContainerDetail": "styles-module-scss-module__ie2kxq__notiContainerDetail",
  "notiHeader": "styles-module-scss-module__ie2kxq__notiHeader",
  "notiItemContainer": "styles-module-scss-module__ie2kxq__notiItemContainer",
  "notiType": "styles-module-scss-module__ie2kxq__notiType",
  "notiTypeDetail": "styles-module-scss-module__ie2kxq__notiTypeDetail",
  "processing": "styles-module-scss-module__ie2kxq__processing",
  "readAll": "styles-module-scss-module__ie2kxq__readAll",
  "sendTime": "styles-module-scss-module__ie2kxq__sendTime",
  "subContainer": "styles-module-scss-module__ie2kxq__subContainer",
  "title": "styles-module-scss-module__ie2kxq__title",
});
}),
"[project]/src/util/baseRequestHandle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserDeviceInfo",
    ()=>getUserDeviceInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ua$2d$parser$2d$js$2f$src$2f$main$2f$ua$2d$parser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ua-parser-js/src/main/ua-parser.mjs [app-client] (ecmascript)");
;
const getUserDeviceInfo = ()=>{
    const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ua$2d$parser$2d$js$2f$src$2f$main$2f$ua$2d$parser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UAParser"]();
    const result = parser.getResult();
    const ip = "client-1111" // sau này nên làm chức năng đăng nhập kết hợp OTP để gọi 1 phát xuống server lấy IP của client sau đó cắm hẳn vào FE mỗi lần hết phiên call lại để lấy IP
    ;
    return {
        os: result.os.name,
        browser: result.browser.name,
        ip: ip
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/messageContext.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMessageInstance",
    ()=>getMessageInstance,
    "setMessageInstance",
    ()=>setMessageInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var _s = __turbopack_context__.k.signature();
;
let messageApi;
const setMessageInstance = ()=>{
    _s();
    const [api, contextHolder] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].useMessage();
    messageApi = api;
    return contextHolder;
};
_s(setMessageInstance, "HvpGRfu+FcBNQUFwAm+djIv1oT4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].useMessage
    ];
});
const getMessageInstance = ()=>{
    if (!messageApi) {
        throw new Error("Message instance chưa được khởi tạo!");
    }
    return messageApi;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/httpCall.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/api/axiosClient.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$baseRequestHandle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/baseRequestHandle.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qs/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$messageContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/messageContext.ts [app-client] (ecmascript)");
;
;
;
;
const ROOT_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BACKEND_URL;
const axiosClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ROOT_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
});
// Interceptor cho request
axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("_t");
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    switch(config.method?.toLocaleLowerCase()){
        case "post":
            {
                config.data = {
                    ...config.data,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$baseRequestHandle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserDeviceInfo"])()
                };
                break;
            }
        case "get":
            {
                config.paramsSerializer = (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stringify(params, {
                        arrayFormat: "repeat"
                    });
                config.params = {
                    ...config.params || {},
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$baseRequestHandle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserDeviceInfo"])()
                };
                break;
            }
    }
    return config;
}, (error)=>Promise.reject(error));
// Interceptor cho response
axiosClient.interceptors.response.use((response)=>response, (error)=>{
    console.error(error);
    const messageApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$messageContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessageInstance"])();
    const status = error.response?.status;
    const errorMess = error.response?.data.error;
    const code = error.code;
    if (code === "ERR_NETWORK") {
        messageApi.error("Kết nối đến máy chủ thất bại!");
        return Promise.reject(error);
    }
    switch(status){
        case 400:
            {
                messageApi.error(errorMess);
                break;
            }
        case 403:
            {
                messageApi.error(errorMess);
                break;
            }
        case 401:
            {
                break;
            }
        case 503:
            {
                messageApi.error("Ứng dụng đang bảo trì!");
                break;
            }
        case 500:
            {
                messageApi.error("Ứng dụng đang bảo trì!");
                break;
            }
    }
    // window.location.href = "http://localhost:3000/";
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constant/serviceUrl.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_SERVICE",
    ()=>AUTH_SERVICE
]);
const AUTH_SERVICE = ""; // export const AUTH_SERVICE = "/auth-service";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/authApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$httpCall$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/httpCall.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$serviceUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/serviceUrl.ts [app-client] (ecmascript)");
;
;
const authApi = {
    // getMedia: async (payload) => {
    //     const res = await axiosIns.get(`/auth-service/media/f?filename=${payload.fileName}`)
    //     return res.data;
    // },
    getBtnRole: async ()=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$httpCall$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$serviceUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_SERVICE"]}/get-btn-role`);
        return res.data;
    },
    login: async (requestBody)=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$httpCall$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$serviceUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_SERVICE"]}/login`, requestBody);
        return res.data;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/globalSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// store/slices/exampleSlice.js
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "setBtnRole",
    ()=>setBtnRole,
    "setCallBack",
    ()=>setCallBack,
    "setOptionFeatures",
    ()=>setOptionFeatures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const userApp = {};
const appSlice = {};
const globalSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "global",
    initialState: {
        userApp,
        appSlice
    },
    reducers: {
        setBtnRole: (state, action)=>{
            state.userApp.btnRole = action.payload;
        },
        setUserRole: (state, action)=>{
            console.error(action);
            state.userApp.userRole = [
                "ADMIN"
            ];
        },
        setOptionFeatures: (state, action)=>{
            state.appSlice.optionFeatures = action.payload;
        },
        setCallBack: (state, action)=>{
            state.appSlice.callBack = action.payload;
        }
    }
});
const { setBtnRole, setOptionFeatures, setCallBack } = globalSlice.actions;
const __TURBOPACK__default__export__ = globalSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/empty.webp (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/empty.b0d75b8f.webp");}),
"[project]/public/empty.webp.mjs { IMAGE => \"[project]/public/empty.webp (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$empty$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/empty.webp (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$empty$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/webp;base64,UklGRn4BAABXRUJQVlA4THIBAAAvB8ABEM1VICICHghADCIAAICbCREkQAImlkQQUQIQAHiAIAAACAICgAAAAAAhJAEACCIJAEClnyBtAAAADwQoBxUAAOD831lXBIvAVySYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEj8EeZRIq2cx4IQA4CAADA+d9+2iICUA8SMAIAQgoAAAAAAAAAAAAAAAAAAAADCQYEQCgQxAylMvNAAHIQAAAAzv9+AQqQAAEQAAIQBDEAAqAZAEgAAAgCBAyiCoghAAAABIiCAUNAmIoEQACgCCVGCEwCHwAoQsnT+Y2c9swz59rEud797dyyITTqh/zuEMVst99k16hfa9ZsMh+WpRxnze1VmnzHYeWTNMXAu3Ni/CMwnx8bn/IiZPO/Uf+nNB8IlCRskdCUsHF2DycPImvbBaP2i/erjI6KcGesjjGY+XiL8xV6pr3tat/zdplEs45V5Yei37rmScoCABS/yMqsB49LrKf705dU8QIA"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/SexyNotification.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SexyNotification",
    ()=>SexyNotification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/styles.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$empty$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$empty$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/empty.webp.mjs { IMAGE => "[project]/public/empty.webp (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-client] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
const SexyNotification = ({ isShow = false })=>{
    _s();
    const [activeType, setActiveType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước",
            isRead: true
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        },
        {
            title: "XIn chaào",
            shortContent: "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
            sendTime: "4 ngày trước"
        }
    ]);
    // Chỗ này để gọi call back khi nhận noti sẽ chạy hàm nào
    const appSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SexyNotification.useSelector[appSlice]": (state)=>state.global.appSlice
    }["SexyNotification.useSelector[appSlice]"]);
    // appSlice.callBack("");
    const clearClickEvent = (e)=>{
        e.stopPropagation();
    };
    const handleSetActiveType = (value)=>{
        setActiveType(value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: clearClickEvent,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiContainer, isShow ? "show-with-magic" : "disappear-with-magic"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiContainerDetail,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                children: "Thông báo"
                            }, void 0, false, {
                                fileName: "[project]/src/app/SexyNotification.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readAll,
                                children: "Đánh dấu đã đọc"
                            }, void 0, false, {
                                fileName: "[project]/src/app/SexyNotification.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/SexyNotification.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiType,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>{
                                    handleSetActiveType(1);
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiTypeDetail, activeType === 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ""),
                                children: "Tất cả"
                            }, void 0, false, {
                                fileName: "[project]/src/app/SexyNotification.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>{
                                    handleSetActiveType(2);
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiTypeDetail, activeType === 2 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ""),
                                children: "Hôm nay"
                            }, void 0, false, {
                                fileName: "[project]/src/app/SexyNotification.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>{
                                    handleSetActiveType(3);
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiTypeDetail, activeType === 3 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ""),
                                children: "Chưa đọc"
                            }, void 0, false, {
                                fileName: "[project]/src/app/SexyNotification.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/SexyNotification.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("hide-scrollbar", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content),
                        children: [
                            (!notifications || notifications.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].noData,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                alt: "empty",
                                                height: 60,
                                                width: 60,
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$empty$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$empty$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/SexyNotification.tsx",
                                                lineNumber: 201,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/SexyNotification.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Không có dữ liệu"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/SexyNotification.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/SexyNotification.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                                spinning: false,
                                size: "large",
                                children: notifications.map((noti, index)=>{
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiItemContainer, noti.isRead && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hasRead),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: noti.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/SexyNotification.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/SexyNotification.tsx",
                                                lineNumber: 217,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentNoti,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: noti.shortContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/SexyNotification.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/SexyNotification.tsx",
                                                lineNumber: 220,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sendTime,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: noti.sendTime
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/SexyNotification.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/SexyNotification.tsx",
                                                lineNumber: 223,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            !noti.isRead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].processing,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                                    size: "default",
                                                    status: "processing"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/SexyNotification.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/SexyNotification.tsx",
                                                lineNumber: 227,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/app/SexyNotification.tsx",
                                        lineNumber: 210,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/SexyNotification.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/SexyNotification.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/SexyNotification.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/SexyNotification.tsx",
            lineNumber: 149,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
_s(SexyNotification, "fWPDN5A44kmqfnCQAqFnQkP8x+Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = SexyNotification;
var _c;
__turbopack_context__.k.register(_c, "SexyNotification");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/defaultCss.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultCss",
    ()=>defaultCss
]);
const defaultCss = {
    borderRadius: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/SelectCustom.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectCustom",
    ()=>SelectCustom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$defaultCss$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/defaultCss.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
;
;
;
;
const SelectCustom = ({ style, ...restProps })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
        className: "select-custom",
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$defaultCss$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultCss"],
            ...style
        },
        ...restProps
    }, void 0, false, {
        fileName: "[project]/src/component/SelectCustom.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SelectCustom;
var _c;
__turbopack_context__.k.register(_c, "SelectCustom");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constant/keyCodeMenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Ứng dụng và chức năng
__turbopack_context__.s([
    "API",
    ()=>API,
    "API_ROLE_APPLY",
    ()=>API_ROLE_APPLY,
    "APPLICATION",
    ()=>APPLICATION,
    "APPLICATION_FUNCTION",
    ()=>APPLICATION_FUNCTION,
    "APPLY_ROLE",
    ()=>APPLY_ROLE,
    "APP_ROLE",
    ()=>APP_ROLE,
    "FUNCTION",
    ()=>FUNCTION
]);
const APPLICATION_FUNCTION = "application-function";
const APPLICATION = "/application-function/application";
const FUNCTION = "function";
const API = "/application-function/api";
const API_ROLE_APPLY = "/application-function/api/role-apply";
const APP_ROLE = "app-role";
const APPLY_ROLE = "/application-function/apply-role"; // Quản lý người dùng
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/router/appFunction.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appFunction",
    ()=>appFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/keyCodeMenu.ts [app-client] (ecmascript)");
;
const appFunction = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROLE_APPLY"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLICATION"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLY_ROLE"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/router/sexyIndexDefineRouter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sexyIndexDefineRouter",
    ()=>sexyIndexDefineRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$router$2f$appFunction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/router/appFunction.ts [app-client] (ecmascript)");
;
const sexyIndexDefineRouter = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$router$2f$appFunction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appFunction"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/menu/letsGo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "goPage",
    ()=>goPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$router$2f$sexyIndexDefineRouter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/router/sexyIndexDefineRouter.ts [app-client] (ecmascript)");
;
const goPage = (key, params)=>{
    let uri = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$router$2f$sexyIndexDefineRouter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sexyIndexDefineRouter"].find((item)=>{
        return item === key;
    });
    if (params) {
        uri += queryString(params);
    }
    console.error(uri);
    return uri || "";
};
const queryString = (params)=>{
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/menu/appAndFunction.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appAndFunction",
    ()=>appAndFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/keyCodeMenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/bs/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ri/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/si/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ai/index.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const appAndFunction = {
    key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLICATION_FUNCTION"],
    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RiAppsFill"]),
    label: "Ứng dụng & chức năng",
    children: [
        {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLICATION"],
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoIosApps"]),
            label: "Ứng dụng",
            childFeatures: [
                {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLICATION"],
                    label: "Quản lý ứng dụng"
                }
            ]
        },
        {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FUNCTION"],
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiApplearcade"]),
            label: "Chức năng",
            childFeatures: [
                {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FUNCTION"],
                    label: "Quản lý chức năng"
                }
            ]
        },
        {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"],
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AiOutlineApi"]),
            label: "Api",
            childFeatures: [
                {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"],
                    label: "Quản lý API"
                }
            ]
        },
        {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLY_ROLE"],
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BsPersonFillLock"]),
            label: "Phân quyền",
            childFeatures: [
                {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$keyCodeMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLY_ROLE"],
                    label: "Phân quyền"
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/menu/menu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "menus",
    ()=>menus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$appAndFunction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/menu/appAndFunction.ts [app-client] (ecmascript)");
;
const menus = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$appAndFunction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appAndFunction"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/Wrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Wrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/styles.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/tb/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/breadcrumb/index.js [app-client] (ecmascript) <export default as Breadcrumb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/dropdown/index.js [app-client] (ecmascript) <export default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/layout/index.js [app-client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$menu$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/menu/index.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/antd/es/layout/layout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$Sider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/antd/es/layout/Sider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuFoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuFoldOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MenuFoldOutlined.js [app-client] (ecmascript) <export default as MenuFoldOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuUnfoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuUnfoldOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MenuUnfoldOutlined.js [app-client] (ecmascript) <export default as MenuUnfoldOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/authApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$globalSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/globalSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$SexyNotification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/SexyNotification.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$SelectCustom$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/SelectCustom.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$letsGo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/menu/letsGo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/menu/menu.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const headerStyle = {
    textAlign: "center",
    height: 64,
    lineHeight: "64px",
    padding: "0 24px",
    background: "white"
};
const siderStyle = {
    overflow: "auto",
    height: "100vh",
    background: "#323A48",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable"
};
const footerStyle = {
    textAlign: "center",
    color: "#fff"
};
const logoStyle = {
    height: "32px",
    margin: "16px",
    background: " rgba(255, 255, 255, .2)",
    borderRadius: "6px"
};
function Wrapper({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showNoti, setShowNoti] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [subMenuValue, setSubMenuValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const global = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "Wrapper.useSelector[global]": (state)=>state.global
    }["Wrapper.useSelector[global]"]);
    const appSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "Wrapper.useSelector[appSlice]": (state)=>state.global.appSlice
    }["Wrapper.useSelector[appSlice]"]);
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const handleUnShowNoti = (e)=>{
        if (!showNoti) {
            return;
        }
        e.stopPropagation();
        setShowNoti(false);
    };
    const handleShowNoti = (e)=>{
        if (showNoti || !e) {
            return;
        }
        e.stopPropagation();
        setShowNoti(true);
    };
    const handleGetBtnRole = async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].getBtnRole();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$globalSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBtnRole"])(res));
        } catch (e) {
            console.error(e);
        }
    };
    const handleClickMenu = (menuItem)=>{
        for (const menu of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["menus"]){
            if ("children" in menu && menu.children) {
                const children = menu.children;
                const subMenu = children.find((item)=>{
                    return item.key === menuItem.key;
                });
                if (subMenu) {
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$globalSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setOptionFeatures"])(subMenu.childFeatures));
                    if ("TURBOPACK compile-time truthy", 1) {
                        localStorage.setItem("_sub", JSON.stringify(subMenu.childFeatures));
                        localStorage.setItem("_sub-selected", subMenu.childFeatures[0].value);
                    }
                    setSubMenuValue(subMenu.childFeatures[0].value);
                    router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$letsGo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["goPage"])(subMenu.key, {
                        id: 1
                    }));
                }
            }
        }
    };
    const handleGoPage = (key)=>{
        if (key) {
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("_sub-selected", key);
            }
            router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$letsGo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["goPage"])(key, {
                id: 1
            }));
            setSubMenuValue(key);
        }
    };
    const items = [
        {
            key: "1",
            label: "Đỗ Quang Anh",
            disabled: true
        },
        {
            type: "divider"
        },
        {
            key: "3",
            label: "Đổi mật khẩu",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TbLockPassword"], {}, void 0, false, {
                fileName: "[project]/src/app/Wrapper.tsx",
                lineNumber: 148,
                columnNumber: 13
            }, this),
            extra: ""
        },
        {
            key: "4",
            label: "Đăng xuất",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaSignOutAlt"], {}, void 0, false, {
                fileName: "[project]/src/app/Wrapper.tsx",
                lineNumber: 154,
                columnNumber: 13
            }, this),
            extra: ""
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Wrapper.useEffect": ()=>{
            handleGetBtnRole();
            const token = localStorage.getItem("_t");
            setIsLogin(!!token);
            window.scrollTo(0, 0);
            if ("TURBOPACK compile-time truthy", 1) {
                const sub = localStorage.getItem("_sub");
                const subSelected = localStorage.getItem("_sub-selected");
                // dispatch(setOptionFeatures(JSON.parse(sub || "")));
                setSubMenuValue(subSelected || "");
            }
            return ({
                "Wrapper.useEffect": ()=>{}
            })["Wrapper.useEffect"];
        }
    }["Wrapper.useEffect"], []);
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                style: {},
                hasSider: true,
                onClick: handleUnShowNoti,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$Sider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "menu",
                        trigger: null,
                        collapsed: collapsed,
                        onCollapse: (value)=>setCollapsed(value),
                        width: "280px",
                        style: siderStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: logoStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/Wrapper.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$menu$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                mode: "inline",
                                defaultSelectedKeys: [
                                    "1"
                                ],
                                items: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$menu$2f$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["menus"],
                                onClick: handleClickMenu
                            }, void 0, false, {
                                fileName: "[project]/src/app/Wrapper.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/Wrapper.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                        style: {
                            padding: "0 24px 24px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerWrapper,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                                        style: headerStyle,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                            justify: "space-between",
                                            style: {
                                                height: "64px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            type: "text",
                                                            icon: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuUnfoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuUnfoldOutlined$3e$__["MenuUnfoldOutlined"], {}, void 0, false, {
                                                                fileName: "[project]/src/app/Wrapper.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 37
                                                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuFoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuFoldOutlined$3e$__["MenuFoldOutlined"], {}, void 0, false, {
                                                                fileName: "[project]/src/app/Wrapper.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 62
                                                            }, void 0),
                                                            onClick: ()=>setCollapsed(!collapsed),
                                                            style: {
                                                                fontSize: "16px"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/Wrapper.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__["Breadcrumb"], {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].appBreadcrumb,
                                                            separator: ">",
                                                            items: [
                                                                {
                                                                    title: "Home"
                                                                },
                                                                {
                                                                    title: "Quản trị hệ thống",
                                                                    href: ""
                                                                }
                                                            ]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/Wrapper.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/Wrapper.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notiBell,
                                                            overflowCount: 9,
                                                            count: 11,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].antAvatar,
                                                                    shape: "circle",
                                                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoMdNotificationsOutline"], {}, void 0, false, {
                                                                        fileName: "[project]/src/app/Wrapper.tsx",
                                                                        lineNumber: 249,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    onClick: handleShowNoti
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/Wrapper.tsx",
                                                                    lineNumber: 246,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$SexyNotification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SexyNotification"], {
                                                                    isShow: showNoti
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/Wrapper.tsx",
                                                                    lineNumber: 252,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/Wrapper.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                                            menu: {
                                                                items
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarContainer,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                    src: "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/Wrapper.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/Wrapper.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/Wrapper.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/Wrapper.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/Wrapper.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/Wrapper.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breadcrumbSubfunction),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__["Breadcrumb"], {
                                                items: [
                                                    {
                                                        title: "Home"
                                                    },
                                                    {
                                                        title: "List"
                                                    },
                                                    {
                                                        title: "App"
                                                    }
                                                ],
                                                style: {
                                                    margin: "12px 0"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Wrapper.tsx",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subContainer,
                                                children: true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$SelectCustom$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectCustom"], {
                                                    placeholder: "Chọn chức năng",
                                                    value: subMenuValue,
                                                    style: {
                                                        minWidth: "240px"
                                                    },
                                                    onChange: handleGoPage,
                                                    options: appSlice.optionFeatures
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Wrapper.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Wrapper.tsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/Wrapper.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/Wrapper.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentWrapper,
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/src/app/Wrapper.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {
                                style: footerStyle,
                                children: "Footer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/Wrapper.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/Wrapper.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/Wrapper.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, this),
            !isLogin && children
        ]
    }, void 0, true);
}
_s(Wrapper, "STwORvDc7xRXAxDmcv1h9Q12CIA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = Wrapper;
var _c;
__turbopack_context__.k.register(_c, "Wrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// store/store.js
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux/dist/redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$globalSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/globalSlice.ts [app-client] (ecmascript)");
;
;
;
const rootReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineReducers"])({
    global: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$globalSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: rootReducer
});
const __TURBOPACK__default__export__ = store;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$Wrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/Wrapper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$messageContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/messageContext.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function RootLayout({ children }) {
    const messageContextHolder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$messageContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMessageInstance"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
                store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: [
                    messageContextHolder,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$Wrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = RootLayout;
var _c;
__turbopack_context__.k.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_09ea15e8._.js.map