import { UAParser } from 'ua-parser-js';


export const getUserDeviceInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();
    const ip = "client-1111" // sau này nên làm chức năng đăng nhập kết hợp OTP để gọi 1 phát xuống server lấy IP của client sau đó cắm hẳn vào FE mỗi lần hết phiên call lại để lấy IP
    return {
        os: result.os.name, // Hệ điều hành (Windows, Mac OS, Linux, v.v.)
        browser: result.browser.name, // Trình duyệt (Chrome, Firefox, Safari, v.v.)
        ip: ip
    };
};

