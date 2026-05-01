import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { sidebarNotify } from "../api/notification";
import isEmpty from "../lib/isEmpty";
import { CBadge } from "@coreui/react";

export const AppSidebarNav = ({ items }) => {
  const { restriction, role } = useSelector(state => state.role);

  const location = useLocation();
  const [notification, setNotificaion] = useState({});
  const [notificationLoader, setNotificaionLoader] = useState(false);

  // const fetchSetting = async () => {
  //   try {
  //     setNotificaionLoader(true);
  //     const { success, result } = await sidebarNotify();
  //     if (success) setNotificaion(result);
  //     setNotificaionLoader(false);
  //   } catch (err) {
  //     console.log(err, "error");
  //   }
  // };

  function notificationProvider(type, key) {
    try {
      if (isEmpty(notification)) return null;

      const keys = {
        navItem: {
          "Users Kyc List": "userKyc",
          "Trading Account Request": "tradingAccReq",
          "IB Request": "iBAccReq",
          "Strategy Requests": "pammAccReq",
          "Provider Requests": "cpAccReq",
          "Deactivate Request": "deactivateReq",
          CryptoWithdraw: "cryptoWithdrawReq",
          Deposit: "depositeReq",
          Withdraw: "withdrawReq",
          Support: "supportReq",
          "Contact Us": "contactusReq",
        },
        navGroup: {
          "User Management": () =>
            (notification?.userKyc || 0) + (notification?.tradingAccReq || 0),
          "IB Management": () => notification?.iBAccReq || 0,
          PAMM: () => notification?.pammAccReq || 0,
          "Social Trading": () => notification?.cpAccReq || 0,
          "Manage Transactions": () =>
            (notification?.depositeReq || 0) +
            (notification?.withdrawReq || 0) +
            (notification?.cryptoWithdrawReq || 0),
          // "Crypto withdraw": () => notification?.cryptoWithdrawReq || 0,
          Contact: () => notification?.contactusReq || 0,
          Support: () => notification?.supportReq || 0,
        },
      };

      const handler = keys[type]?.[key];

      if (handler) {
        const value =
          typeof handler === "function" ? handler() : notification[handler];
        return value > 0 ? value : null;
      }

      return null;
    } catch (error) {
      console.error("notificationProvider error", error);
      return null;
    }
  }

  // useEffect(() => {
  //   if (!notificationLoader && isEmpty(notification)) fetchSetting();
  // }, [notificationLoader]);
  // Helper function to determine if an item is visible
  const isItemVisible = name => {
    let haveRestriction =
      restriction && restriction?.filter(item => item?.name === name);
    return role === "superadmin" || haveRestriction?.[0]?.canView;
  };

  // Recursive function to check if any child item is visible
  const hasVisibleChildren = items => {
    return items.some(
      item =>
        isItemVisible(item.name) ||
        (item.items && hasVisibleChildren(item.items))
    );
  };

  // Helper function to render a nav link
  const navLink = (name, icon, badge, type) => {
    return (
      <div>
        <div className="position-relative ">
          {type == "navGroup" ? (
            <CBadge
              color="primary"
              shape="rounded-pill"
              className="notify_count_1"
            >
              {notificationProvider(type, name)}
            </CBadge>
          ) : (
            <CBadge
              color="primary"
              shape="rounded-pill"
              className="notify_count_1"
            >
              {notificationProvider(type, name)}
            </CBadge>
          )}
        </div>
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </div>
    );
  };

  // Render a nav item
  const navItem = (item, index) => {
    const { component: Component, name, isShow, badge, icon, ...rest } = item;
    if (!isItemVisible(name)) return null;
    if (isShow == false) return null;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {/* <div className="position-relative "> */}
        {navLink(name, icon, badge, "navItem")}
      </Component>
    );
  };

  // Render a nav group
  const navGroup = (item, index) => {
    const {
      component: Component,
      name,
      icon,
      to,
      badge,
      items: groupItems,
      ...rest
    } = item;

    // Check if the group or any of its children are visible
    if (!isItemVisible(name) && !hasVisibleChildren(groupItems)) return null;

    let isActiveModule = groupItems.find(item => item.to === location.pathname);
    const groupStyle = isActiveModule ? { color: "#ffffff" } : {};
    return (
      <Component
        idx={String(index)}
        key={index}
        className={isActiveModule ? "active-main" : ""}
        // toggler={navLink(name, icon, badge, "navGroup")}
        toggler={
          <div style={groupStyle}>{navLink(name, icon, badge, "navGroup")}</div>
        }
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {groupItems?.map((subItem, subIndex) =>
          subItem.items
            ? navGroup(subItem, subIndex)
            : navItem(subItem, subIndex)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
