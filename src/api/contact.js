import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getContacts = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/contact`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getContactById = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/contact/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateContact = async (id, data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/contact/${id}`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const deleteContact = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "delete",
      url: `/adminapi/contact/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
