import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getEnquiries = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/enquiry`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getEnquiryById = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/enquiry/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateEnquiry = async (id, data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/enquiry/${id}`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const deleteEnquiry = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "delete",
      url: `/adminapi/enquiry/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
