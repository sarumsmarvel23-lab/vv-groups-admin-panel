import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getSubModules = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/getSubModules`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
