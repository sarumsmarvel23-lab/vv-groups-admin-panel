//import config
import axios from "../config/axios";
import config from "../config";
import { handleResp } from "../config/axios";
import { role } from "src/redux/role/role.action";

export const loginApi = async (data, dispatch) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/login`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const forgotPasswordApi = async data => {
  try {
    let respData = await axios({
      method: "post",
      url: config.USER_SERVICE.URL + `/adminapi/forgotPassword`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const resetPasswordApi = async data => {
  try {
    let respData = await axios({
      method: "post",
      url: config.USER_SERVICE.URL + `/adminapi/resetPassword`,
      data,
    });
    return {
      status: "success",
      loading: false,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    };
  }
};

export const getAdminData = async dispatch => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/getadmindetail`,
    });
    role(
      {
        _id: respData.data.result._id,
        name: respData.data.result.name,
        email: respData.data.result.email,
        role: respData.data.result.role,
        restriction: respData.data.result.restriction,
      },
      dispatch
    );
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const CheckTokenAuth = async data => {
  try {
    let respData = await axios({
      method: "post",
      url: config.USER_SERVICE.URL + `/adminapi/checkauthtoken`,
      data,
    });
    return {
      status: "success",
      loading: false,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    };
  }
};
