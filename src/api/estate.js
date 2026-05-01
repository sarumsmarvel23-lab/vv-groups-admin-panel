import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getEstates = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/estate`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getEstateById = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/estate/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const addEstate = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/estate`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateEstate = async (id, data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/estate/${id}`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const deleteEstate = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "delete",
      url: `/adminapi/estate/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
