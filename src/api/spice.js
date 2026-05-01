import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getSpices = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/spice`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getSpiceById = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/spice/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const addSpice = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/spice`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateSpice = async (id, data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/spice/${id}`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const deleteSpice = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "delete",
      url: `/adminapi/spice/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
