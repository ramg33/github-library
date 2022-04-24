
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastAlert = (type, message) => {
    
    if (toast != null) {
        toast.dismiss();
    }
    toast.configure();
    switch (type) {
    case 'success':
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER
        });
        break;
    case 'error':
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER
        });
        break;
    case 'warn':
        toast.warn(message, {
            position: toast.POSITION.TOP_CENTER
        });
        break;
    case 'info':
        toast.info(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        break;
    case 'success':
        toast(message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'foo-bar'
        });
        break;  
    default:
        break;
}
}

export default ToastAlert;