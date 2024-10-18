import { toast } from "react-toastify";

export const errorToast = (error) => {
  return (
    toast.error(<div onClick={() => {
      detailsToast(error)
    }}>
      !خطا
      <h6>برای اطلاعات بیشتر کلیک کنید</h6>
    </div>, {
      autoClose: 5000,
      position: 'top-left'
    })
  )
};

export const detailsToast = (error) => {
  toast.warn(<div>
    message: {error.message}
    <hr/>
    <br />
    code: {error.code}
    <hr/>
    <br />
    name: {error.name}
    <hr/>
    <br />
    response: {error.request.response}
    <hr/>
    <br />
    statusText: {error.request.statusText}
  </div>, {
    autoClose: false
  })
}


export const successToast = (message) => {
  toast.success(<div>{message}</div>)
};

const infoToast = () => {};

const warningToast = () => {};
