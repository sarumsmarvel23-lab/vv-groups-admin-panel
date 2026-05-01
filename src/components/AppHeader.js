import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import AppNotificationDropdown from "./header/AppNotificationDropdown";
import { AppHeaderDropdown } from "./header/index";

import { SplitWords } from "../lib/string";
import config from "../config/index";

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector(state => state.changeState.sidebarShow);
  const { role } = useSelector(state => state.role);
  const { emailLogo } = useSelector(state => state.Setting);
  const location = useLocation();
  return (
    <>
      <CContainer fluid>
        <CHeader position="sticky" className="mb-4">
          <CHeaderBrand className="d-md-none" to="/">
            {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
            {emailLogo ? (
              <img src={emailLogo.startsWith('http') ? emailLogo : `${config.imgUrl}${emailLogo}`} className="img img-fluid" style={{ maxHeight: '40px' }} alt="Logo" />
            ) : (
              <img src={"/logo.png"} className="img img-fluid" alt="Logo" />
            )}
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <h2 className="pageName">
                {window.location.pathname
                  ? SplitWords(window.location.pathname)
                  : window.location.pathname
                      .split("/")[1]
                      .replace("-", " ")
                      .toUpperCase()}
              </h2>
            </CNavItem>
            {/* <CNavItem>
            <Link to={'/userList'}>
              <CNavLink>Users</CNavLink>
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={'/site-setting'}>
              <CNavLink href="#">Settings</CNavLink>
            </Link>{' '}
          </CNavItem> */}
          </CHeaderNav>
          {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
          <CHeaderNav className="ms-3">
            {/* {role == "superadmin" && <AppNotificationDropdown />} */}
            <AppHeaderDropdown />
          </CHeaderNav>
          <CHeaderToggler
            onClick={() =>
              dispatch({
                type: "set",
                sidebarShow: sidebarShow === true ? false : true,
              })
            }
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderDivider />
        </CHeader>
      </CContainer>
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </>
  );
};

export default AppHeader;
