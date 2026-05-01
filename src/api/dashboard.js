import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getVVDashboardStats = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/dashboard-stats`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
