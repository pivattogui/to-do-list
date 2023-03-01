import { ToastContent, TypeOptions, UpdateOptions } from "react-toastify";

export const toastPromiseUpdate = (type: TypeOptions, render: ToastContent): UpdateOptions => ({
    type,
    render,
    isLoading: false,
    autoClose: 5000,
    closeButton: true,
    closeOnClick: true
})