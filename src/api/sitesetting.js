// import config
import config from "../config";
import axios from "../config/axios";
import { handleResp } from "../config/axios";

export const getSiteSetting = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/getSiteSetting`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateSetting = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/updateSiteSetting`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateSiteDetail = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/updateSiteDetails`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const updateBanner = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/updateSiteDetails`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const updateUsrDash = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/updateUsrDash`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getPairDropdown = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/getPairDropdown`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const updateMailIntegrate = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/updatemailintegrate`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const getMailIntegrate = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/getemailintegrate`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const updatesmsConfig = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/updatesmsconfig`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const GetSliderManage = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/slider`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const UpdateSliderManage = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/slider`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const DeleteSliderManage = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "delete",
      url: `/adminapi/slider`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
