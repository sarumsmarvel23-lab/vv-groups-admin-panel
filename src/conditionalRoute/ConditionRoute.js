import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Navigate,
  useLocation,
  useNavigate,
  matchPath,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../lib/localStorage";
import { role } from "src/redux/role/role.action";
import isEmpty from "../lib/isEmpty";
import nav from "src/_nav";

// routes config
import routes from "../routes";

const ConditionRoute = ({ type, children }) => {
  const currentLocation = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    role: adminRole,
    restriction,
    _id,
    name,
    email,
  } = useSelector(state => state.role);

  useEffect(() => {
    if (
      adminRole !== "superadmin" &&
      restriction?.length > 0 &&
      !isEmpty(currentLocation.pathname)
    ) {
      let isNavigated = false;
      const NaveHead = nav.find(el =>
        el.items
          ? el.to === currentLocation.pathname ||
            el.items.find(data => data?.to === currentLocation.pathname)
          : el.to === currentLocation.pathname
      );
      const secondPath = currentLocation.pathname.split("/");

      const publicPath = [
        "/login",
        "/register",
        "/profile",
        "/404",
        "/changePassword",
        "/2fa-settings",
      ];
      if (publicPath.includes(currentLocation.pathname)) {
        return;
      }
      // if have any extra path in url then restrection not work
      // if (secondPath.length != 3) {
      if (!isEmpty(NaveHead)) {
        // If the current route is found in `nav`

        const findSubNav = NaveHead?.items?.find(
          item => item?.to === currentLocation.pathname
        ) || (NaveHead?.to === currentLocation.pathname ? NaveHead : null);
        
        const canAccess = restriction.findIndex(
          item => item?.name === findSubNav?.name
        );
        
        if (findSubNav && canAccess > -1 && secondPath.length != 3) {
          let restrictionData = restriction[canAccess];
          role(
            {
              _id: _id,
              name: name,
              email: email,
              role: adminRole,
              restriction: restriction,
              currentPageAccess: restrictionData,
            },
            dispatch
          );

          if (restrictionData?.canView) {
            navigate(findSubNav?.to);
            isNavigated = true;
          }
        }
      } else {
        // if it not found means in nave then it maybe a edit or add page
        const currentRoute = routes.find(route =>
          matchPath(route.path, location.pathname)
        );
        if (currentRoute?.restrictionName) {
          const canAccess = restriction.findIndex(
            item => item?.name === currentRoute?.restrictionName
          );
          if (canAccess > -1) {
            let restrictionData = restriction[canAccess];
            if (restrictionData?.canView) {
              navigate(location.pathname);
              isNavigated = true;
            }
          }
        }
      }

      // if no access and 404 page then redirect first accessible page
      // Navigate to accable route
      // Flag to track if navigation has occurred

      for (
        let navIndex = 0;
        navIndex < nav.length && !isNavigated;
        navIndex++
      ) {
        const navItem = nav[navIndex];

        if (navItem.items) {
          for (
            let navSubIndex = 0;
            navSubIndex < navItem.items.length && !isNavigated;
            navSubIndex++
          ) {
            const navSub = navItem.items[navSubIndex];

            const canAccess = restriction.findIndex(
              item => item?.name === navSub.name
            );

            if (canAccess > -1) {
              let restrictionData = restriction[canAccess];
              if (restrictionData?.canView) {
                navigate(navSub.to);
                isNavigated = true; // Set flag to exit both loops
              }
            }
          }
        } else {
          const canAccess = restriction.findIndex(
            item => item?.name === navItem.name
          );

          if (canAccess > -1) {
            let restrictionData = restriction[canAccess];
            if (restrictionData?.canView) {
              navigate(navItem.to);
              isNavigated = true; // Set flag to exit the loop
            }
          }
        }
      }

      if (!isNavigated) {
        navigate("/dashboard");
      }
      // }
    } else if (adminRole === "superadmin") {
      role(
        {
          _id: _id,
          name: name,
          email: email,
          role: adminRole,
          restriction: restriction,
          currentPageAccess: {
            canView: true,
            canEdit: true,
          },
        },
        dispatch
      );
    }
  }, [restriction, adminRole, currentLocation.pathname]);

  // Handle authentication and private route redirection
  if (type === "auth" && isLogin()) {
    return <Navigate to="/dashboard" />;
  }
  if (type === "private" && !isLogin()) {
    return <Navigate to="/login" />;
  }

  return children;
};

ConditionRoute.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(ConditionRoute);
