import config from "../config";
import axios, { handleResp } from "../config/axios";

export const List = async data => {
  try {
    const respData = await axios({
      url: config.USER_SERVICE.URL + `/api/admin/getAdminNotification`,
      method: "get",
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const getAdminAllNotification = async data => {
  try {
    const respData = await axios({
      url: config.USER_SERVICE.URL + `/api/admin/getAdminNotification`,
      method: "post",
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const readNotification = async () => {
  try {
    const respData = await axios({
      url: config.USER_SERVICE.URL + `/api/admin/getAdminNotification`,
      method: "put",
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
// export const sidebarNotify = async data => {
//   try {
//     const respData = await axios({
//       url: config.USER_SERVICE.URL + `/api/admin/getSideNotify`,
//       method: "get",
//       params: data,
//     });
//     return handleResp(respData, "success");
//   } catch (err) {
//     return handleResp(err, "error");
//   }
// };
