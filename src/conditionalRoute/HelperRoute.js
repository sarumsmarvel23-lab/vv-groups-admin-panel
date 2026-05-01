// import package
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "src/lib/localStorage";
// import action
import { getAdminData } from "src/api/auth";
//import api
import { getSiteSetting } from "src/api/sitesetting";
import { setting } from "../redux/settings/setting.action";

const HelperRoute = () => {
  const dispatch = useDispatch();

  const fetchSetting = async dispatch => {
    try {
      const { success, result } = await getSiteSetting();
      if (success) setting(result, dispatch);
    } catch (err) {
      console.log(err, "error");
    }
  };

  // function
  useEffect(() => {
    if (isLogin()) {
      getAdminData(dispatch);
    }
    fetchSetting(dispatch);
  }, []);

  return <div />;
};

export default HelperRoute;
