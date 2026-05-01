//import config
import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const loginHistoryApi = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/login-history`,
      params: data,
    });

    if (data.export === "csv" || data.export === "xls") {
      return handleResp(respData, "success", true);
    } else {
      return handleResp(respData, "success");
    }
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const SubloginHistoryApi = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/sub-login-history`,
      params: data,
    });

    if (data.export === "csv" || data.export === "xls") {
      return handleResp(respData, "success", true);
    } else {
      return handleResp(respData, "success");
    }
  } catch (err) {
    return handleResp(err, "error");
  }
};
