// import packages
import axios from "axios";

// import lib
import config from "./index";
import { getAuthToken } from "../lib/localStorage";
import { logout } from "src/redux/auth/auth.action";
import store from "../redux/store";
import { FaGripVertical } from "react-icons/fa";

axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.common["Authorization"] = getAuthToken();
// axios.defaults.headers.common['timezone'] = Number(new Date().getTimezoneOffset())
axios.defaults.headers.common["timezone"] =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const setAuthorization = token => {
  axios.defaults.headers.common["Authorization"] = token;
};
export const handleResp = (
  respData,
  type = "success",
  doc,
  filename = "file" + new Date().getTime() + ".csv"
) => {
  console.log("-->res", respData);
  try {
    if (doc === true && type == "success" && respData && respData.data) {
      if (doc) {
        const blob = new Blob([respData.data], {
          type: respData.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);

        // Append the link to the document body and click it programmatically
        document.body.appendChild(link);
        link.click();

        // Remove the link and revoke the blob URL to free up memory
        link.remove();
        window.URL.revokeObjectURL(url);
        return { data: respData.data };
      }
    }
    if (type == "success" && respData && respData.data) {
      console.log("-->singleif", respData);

      return respData.data;
    } else if (
      type == "error" &&
      respData &&
      respData.response &&
      respData.response.data
    ) {
      // document.cookie =
      //   "admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      // localStorage.removeItem("admin_token");
      // store.dispatch(signOut());
      // // toastAlert("error", "Your session has expired, please login again", "session-expired");
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 2000);
      if (
        respData &&
        respData.response &&
        respData.response.data &&
        respData.response.status == 401
      ) {
        localStorage.removeItem("admin_token");
        // Navigate('/login')
        logout({}, store.dispatch);
        return respData.response.data;
      }
      return respData.response.data;
    } else if (
      type == "error" &&
      // respData &&
      // respData.response &&
      respData.response.data
    ) {
      return respData.response.data;
    } else {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admin_token");
      store.dispatch(logout());
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }
    return Promise.reject(error);
  }
);

export default axios;
