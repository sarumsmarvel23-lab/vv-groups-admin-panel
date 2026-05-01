import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSidebar, CSidebarBrand, CSidebarNav, CImage } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";
// import logo from "../assets/images/logo.svg";
// import logo from "../assets/images/logo.svg";

import config from "../config/index";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector(state => state.changeState.sidebarUnfoldable);
  const sidebarShow = useSelector(state => state.changeState.sidebarShow);
  const { emailLogo } = useSelector(state => state.Setting);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={visible => {
        dispatch({ type: "set", sidebarShow: true });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex login-brand" to="/dashboard">
        {/* {emailLogo ? (
          <CImage
            rounded
            src={config.API_URL + "/settings/" + emailLogo}
            width={100}
            height={55}
          />
        ) : (
          <CImage
            className="img img-fluid"
            rounded
            src={logo}
            width={150}
            height={80}
          />
        )} */}
        {emailLogo ? (
          <CImage
            className="img img-fluid"
            rounded
            src={emailLogo.startsWith('http') ? emailLogo : `${config.imgUrl}${emailLogo}`}
            width={150}
            height={80}
          />
        ) : (
          <CImage
            className="img img-fluid"
            rounded
            src={"/logo.png"}
            width={150}
            height={80}
          />
        )}
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
