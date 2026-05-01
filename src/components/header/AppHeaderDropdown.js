import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilAccountLogout,
  cilUser,
  cilLockLocked,
  cilKeyboard,
  cilHistory,
  cilControl,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "./../../assets/images/avatars/userImage.png";

//import localStorage
//import action
import { logout } from "../../redux/auth/auth.action";

//import lib
import { toast } from "../../redux/toast/toast.action";
import { clearRole } from "src/redux/role/role.action";

const AppHeaderDropdown = () => {
  let { role } = useSelector(state => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //function
  const logoutUser = e => {
    e.preventDefault();
    console.log("===--->logoutddd")
    localStorage.removeItem("admin_token");
    logout({}, dispatch);
    // clearRole(dispatch);
    setTimeout(() => clearRole(dispatch), 1000)

    toast(
      {
        message: "logout successfully",
        type: "success",
      },
      dispatch
    );
    setTimeout(() => navigate("/logins"), 1000)
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <Link to={"/profile"}>
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Profile Settings
          </CDropdownItem>
        </Link>


        <Link to={"/changePassword"}>
          <CDropdownItem>
            <CIcon icon={cilKeyboard} className="me-2" />
            Change Password
          </CDropdownItem>
        </Link>


        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logoutUser}>
          <a>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </a>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
