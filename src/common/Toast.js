import {
    toast
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ErrorMessage = (msg) => {
    toast.error(msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        rtl: true
    });
}
export const SuccessMessage = (msg) => {
    toast.success(msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
    });
}