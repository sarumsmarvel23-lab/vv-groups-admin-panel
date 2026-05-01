//import config
import axios from "../config/axios";
import config from "../config";
import { handleResp } from "../config/axios";

export const getAllUserApi = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/user`,
      params: data,
    });
    if (data.export === "csv" || data.export === "xls") {
      return handleResp(respData, "success", true);
    } else {
      return handleResp(respData, "success");
    }
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getAdminProfile = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: "/adminapi/adminProfile",
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const updateProfile = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: "/adminapi/adminProfile",
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const changePassword = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/adminProfile`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserList = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/users`,
      params:data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};


export const getSingleUser = async id => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/getSingle-User/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserAsset = async id => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/getUser-Asset/${id}`,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};


export const updateUserAsset = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: `/adminapi/user/${data?.id}`,
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserPassbook = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/passbook/${data?.userId}`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getSignupReport = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/report/signup`,
      params: data,
    });
    if (data.export === "csv" || data.export === "xls") {
      return handleResp(respData, "success", true,"Signup-Report.csv");
    } else {
      return handleResp(respData, "success");
    }
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getListUsers = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/listUsers`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

//userkyc

export const getKycList = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: "/adminapi/kycList",
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const approveKycStatus = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: "/adminapi/kyc-approve",
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
 
export const rejectKycStatus = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: "/adminapi/kyc-reject",
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

//userkyb

export const getKybList = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: "/adminapi/kybList",
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const approveKybStatus = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: "/adminapi/kyb-approve",
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
 
export const rejectKybStatus = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "put",
      url: "/adminapi/kyb-reject",
      data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const BuySellList = async (data) => {
  try {
      console.log(data,'datatata')
      let response = await axios({
          'method': 'get',
          'url': `${apiUrl}/buysell-history`,
          params: data,
      });
      console.log(response,'depositet')
      return {
          success: (response && response.data && response.data.status) ? response.data.status : false,
          totalRecords: (response && response.data && response.data.totalRecord) ? response.data.totalRecord : "",
          data: (response && response.data && response.data.data) ? response.data.data : [],
      }
  }
  catch (err) {
      console.log(err,"err");
      return {
          status: false,
          message : '',
          errors : {}
      }
  }
}

export const getBuySellList = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/buysell-list`,
      params:data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};



export const getUserLoginHistory = async (userId, reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/getUserLoginHistory/${userId}`,
      params: reqData,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};


export const getUserFiatDeposits = async (userId, reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/getUserFiatDeposits/${userId}`,
      params: reqData,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserCryptoDeposits = async (userId, reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/getUserCryptoDeposits/${userId}`,
      params: reqData,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserBuyHistory = async (userId, reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/getUserBuyHistory/${userId}`,
      params: reqData,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserSellHistory = async (userId, reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/getUserSellHistory/${userId}`,
      params: reqData,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

//user access
export const markEmailAsVerified = async (userId) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/verify-user/${userId}`,
    });

    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const disableGoogle2FA = async (userId) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/disable-user-2fa/${userId}`,
    });

    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserPassbookDetails = async (userId) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/user-passbook-all/${userId}`,
    });

    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserFiatWithdraw = async (userId, reqData) => {

  console.log(userId  ,"getUserFiatWithdraw");
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/getUserFiatWithdraw/${userId}`,
      params: reqData,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getUserCryptoWithdraw = async (userId, reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "post",
      url: `/adminapi/getUserCryptoWithdraw/${userId}`,
      params: reqData,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getNcinoInvites = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: "/adminapi/ncino-invite-list",
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};