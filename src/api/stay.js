import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getStays = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/stay`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getStayById = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/stay/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const addStay = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/stay`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateStay = async (id, data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/stay/${id}`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const deleteStay = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "delete",
      url: `/adminapi/stay/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
