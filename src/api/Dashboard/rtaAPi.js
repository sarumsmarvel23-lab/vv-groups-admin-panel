//import config
import config from "../../config";
import axios from "../../config/axios";
export const getRTACount = async data => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/api/admin/get-rta`,
      params: data,
    });
    return {
      success: true,
      message: respData?.data?.message,
      result: respData?.data?.result,
    };
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
};

export const getDashTopData = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/api/admin/dashboard/stats`,
    });
    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    console.log(" getDashTopData err");
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
}

export const getDashDailySignup = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/api/admin/dashboard/daily-signup`,
    });
    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    console.log(" getDashDailySignup err");
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
}

export const getDashTradeVol = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/api/admin/dashboard/daily-tradevol`,
    });
    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    console.log("getDashTradeVol err");
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
}


export const getMostTrendMark = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/api/admin/dashboard/most-traded-markets`,
      params: data,
    });
    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    console.log("getMostTrendMark err");
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
}

export const getMostTrendTrader = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/api/admin/dashboard/most-traded-users`,
      params: data,
    });
    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    console.log("getMostTrendTrader err");
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
}


//dashboard
export const getUserAndVerificationStats = async () => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/user-verification-stats`, // adjust the endpoint as per your backend
    });

    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    console.log("getUserAndVerificationStats err");
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
};

export const getAllTransactionDetails = async (params) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/get-all-transactions`,
      params,
    });

    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
};

export const getDashboardChartData = async (params) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/get-dashboard-data`,
      params,
    });

    return {
      success: true,
      result: respData?.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message,
      error: err?.response?.data?.errors,
    };
  }
}

export const getVVDashboardStats = async () => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: "get",
      url: `/adminapi/dashboard-stats`,
    });

    return {
      success: true,
      result: respData?.data?.result,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message,
    };
  }
};
