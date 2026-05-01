import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

// import action
import { toast as Toast } from "../redux/toast/toast.action";

const ToastCAlert = () => {
  const dispatch = useDispatch();

  // redux-state
  const { type, message } = useSelector(state => state.toast);

  useEffect(() => {
    if (type && type !== undefined) {
      type == "success" ? toast.success(message) : toast.error(message);
      Toast({}, dispatch);
    }
  }, [type]);

  return (
    <Toaster
      position="top-center"
      reverseOrder={true}
      toastOptions={{
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          padding: "14px",
        },
      }}
    />
  );
};

export default ToastCAlert;
