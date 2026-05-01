//import config
import axios from "../config/axios";
import config from "../config";
import { handleResp } from "../config/axios";

export const templateList = async data => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "get",
        url: `/adminapi/email-template`,
        params: data,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };

  export const getSingleTemplate = async id => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "get",
        url: `/adminapi/email-template/${id}`,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };

  export const UpdateTemplate = async data => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "put",
        url: `/adminapi/email-template`,
        data,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };

  export const getCmsList = async data => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "get",
        url: `/adminapi/cms`,
        params: data,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };
  
  export const getSingleCms = async id => {
    try {
      // console.log(id, 'idddddddddd')
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "get",
        url: `/adminapi/cms/` + id,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };
  
  export const UpdateCms = async data => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "put",
        url: `/adminapi/cms`,
        data,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };
  export const addCMS = async data => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "post",
        url: `/adminapi/cms`,
        data,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };

  export const getTradeBot = async data => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "get",
        url: `/adminapi/trade-bot`,
        params: data,
      });
      return handleResp(respData, "success");
    } catch (err) { 
      return handleResp(err, "error");
    }
  };

  export const clearBotOrders = async id => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "get",
        url: `/adminapi/bot/clear-order/${id}`,
      });
      return handleResp(respData, "success");
    } catch (err) { 
      return handleResp(err, "error");
    }
  };

  export const getTradeBotById = async id => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "get",
          url: `/adminapi/trade-bot/` + id,  
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };

  export const addTradeBot = async data => {

    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "post",
        url: `/adminapi/trade-bot`,
        data,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };

    export const updateTradeBot = async data => {
    try {
      let respData = await axios({
        baseURL: config.USER_SERVICE.URL,
        method: "put",
        url: `/adminapi/trade-bot`,
        data,
      });
      return handleResp(respData, "success");
    } catch (err) {
      return handleResp(err, "error");
    }
  };