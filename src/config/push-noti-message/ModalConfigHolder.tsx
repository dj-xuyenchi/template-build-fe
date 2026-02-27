import React, { createContext, useContext, ReactNode } from "react";
import { Modal } from "antd";
import type { HookAPI } from "antd/es/modal/useModal";

const ModalContext = createContext<HookAPI | null>(null);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modal, contextHolder] = Modal.useModal();

    return (
        <ModalContext.Provider value={modal}>
            {contextHolder}
            {children}
        </ModalContext.Provider>
    );
};

export const useGlobalModal = (): HookAPI => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("Lỗi cấu hình Modal: useGlobalModal phải được sử dụng bên trong ModalProvider");
    }

    return context;
};