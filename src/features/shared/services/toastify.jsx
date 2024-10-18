import { toast } from "react-toastify";
import '../styles/toast.scss'

export const errorToast = (error, guide) => {
  return (
    toast.error(<div onClick={() => {
      detailsToast(error, guide)
    }}>
      !خطا
      <h6>برای اطلاعات بیشتر کلیک کنید</h6>
    </div>, {
      autoClose: 5000,
      position: 'top-left'
    })
  )
};



export const detailsToast = (error, guide) => {
  toast.info(<div id="detail-toast">
    <h4><span>message:</span> {error.message}</h4>
    <h4><span>code:</span> {error.code}</h4>
    <h4><span>name:</span> {error.name}</h4>
    {error?.request?.response && <h4><span>response:</span> {error?.request?.response}</h4>}
    {error?.request?.statusText && <h4><span>statusText:</span> {error?.request?.statusText}</h4>}
    {guide && <h4><span>guide:</span> {guide}</h4>}
  </div>, {
    autoClose: false
  })
}


export const successToast = (message) => {
  toast.success(<div>{message}</div>)
};

const infoToast = () => {};

const warningToast = () => {};
