import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  CCard,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CForm,
  CCardFooter,
  CButton,
  CInputGroupText,
  CInputGroup,
  CSpinner,
} from "@coreui/react";

import { logout } from "../../redux/auth/auth.action";
//import api
import { changePassword } from "../../api/user";

import validations from "src/lib/validations.js";

//import action
import { toast } from "../../redux/toast/toast.action";
import isEmpty from "src/lib/isEmpty";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

const initialFormValue = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const initialPassValue = {
  old: false,
  new: false,
  confirm: false,
};

const ProfileDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  //state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validErr, setValidErr] = useState({});
  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(initialPassValue);
  const { oldPassword, newPassword, confirmPassword } = formValue;

  //function
  const handleChange = e => {
    let { name, value } = e.target;
    console.log("--->", name, value);
    setFormValue({ ...formValue, ...{ [name]: value } });
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: "" } };
      setValidErr(formDataerr);
    }
    if (name === "newPassword" && value === "") {
      let formDataerr = { ...validErr, ...{ password: "" } };
      setValidErr(formDataerr);
    }
  };
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoader(true);
      let validatedata = [
        // { field: "oldPassword", type: "string", value: oldPassword },
        { field: "password", type: "password", value: newPassword },
        {
          field: "confirmPassword",
          type: "match",
          value: confirmPassword,
          matchValue: newPassword,
        },
      ];
      console.log("validatedata--", validatedata);
      let { errors } = await validations(validatedata);
      if (isEmpty(oldPassword)) {
        errors.oldPassword = "Required";
      }
      console.log(errors);
      if (!isEmpty(errors)) {
        setLoader(false);
        setValidErr(errors);
        return;
      }
      console.log("checking.........");

      let data = {
        oldPassword,
        newPassword,
        confirmPassword,
      };
      let { success, message, error } = await changePassword(data);
      if (success) {
        setLoader(false);
        setValidErr({});
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        logout({}, dispatch);
        history("/dashboard");
      } else {
        if (error) {
          setLoader(false);
          setValidErr(error);
        }
        if (message) {
          setLoader(false);
          toast(
            {
              message: message,
              type: "error",
            },
            dispatch
          );
        }
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const handleShowPass = val => {
    if (val == "old") {
      setShowPass({
        ...initialPassValue,
        ...{ old: showPass.old == false ? true : false },
      });
    } else if (val == "new") {
      setShowPass({
        ...showPass,
        ...{ new: showPass.new == false ? true : false },
      });
    } else if (val == "confirm") {
      setShowPass({
        ...showPass,
        ...{ confirm: showPass.confirm == false ? true : false },
      });
    }
  };
  console.log("validErr", validErr);
  return (
    <CRow>
      <CCol xs={12} sm={12} md={6}>
        <CCard>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
            <CButton
              className="add-btn"
              onClick={() => history(-1)}
              style={{ "margin-right": "10px" }}
            >
              <CIcon icon={cilArrowLeft}></CIcon> Back
            </CButton>
          </div>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter Old Password
                </CFormLabel>
                <CInputGroup className="mb-3 align_ment bddr">
                  <CInputGroupText>
                    <i className="bi bi-lock-fill"></i>
                  </CInputGroupText>
                  <CFormInput
                    type={showPass.old ? "text" : "password"}
                    name="oldPassword"
                    value={oldPassword}
                    placeholder="Old Password"
                    onChange={handleChange}
                  />
                  <CInputGroupText>
                    {showPass.old ? (
                      <i
                        className="bi bi-eye-fill"
                        onClick={() => handleShowPass("old")}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-eye-slash-fill"
                        onClick={() => handleShowPass("old")}
                      ></i>
                    )}
                  </CInputGroupText>
                </CInputGroup>
                <span className="text-danger">
                  {validErr && validErr.oldPassword}
                </span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter New Password
                </CFormLabel>
                <CInputGroup className="mb-3 align_ment bddr">
                  <CInputGroupText>
                    <i className="bi bi-lock-fill"></i>
                  </CInputGroupText>
                  <CFormInput
                    type={showPass.new ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={handleChange}
                  />
                  <CInputGroupText>
                    {showPass.new ? (
                      <i
                        className="bi bi-eye-fill"
                        onClick={() => handleShowPass("new")}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-eye-slash-fill"
                        onClick={() => handleShowPass("new")}
                      ></i>
                    )}
                  </CInputGroupText>
                </CInputGroup>
                <span className="text-danger">
                  {validErr.password
                    ? validErr.password
                    : validErr.newPassword
                      ? validErr.newPassword
                      : null}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter Confirm Password
                </CFormLabel>
                <CInputGroup className="mb-3 align_ment bddr">
                  <CInputGroupText>
                    <i className="bi bi-lock-fill"></i>
                  </CInputGroupText>
                  <CFormInput
                    type={showPass.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  <CInputGroupText>
                    {showPass.confirm ? (
                      <i
                        className="bi bi-eye-fill"
                        onClick={() => handleShowPass("confirm")}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-eye-slash-fill"
                        onClick={() => handleShowPass("confirm")}
                      ></i>
                    )}
                  </CInputGroupText>
                </CInputGroup>
                <span className="text-danger">
                  {validErr && validErr.confirmPassword}
                </span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            {loader && (
              <CButton disabled>
                <CSpinner
                  component="span"
                  size="sm"
                  variant="grow"
                  aria-hidden="true"
                />
                Loading...
              </CButton>
            )}
            {!loader && (
              <CButton
                className="submit-btn"
                onClick={e => {
                  handleSubmit(e);
                }}
              >
                Change Password
              </CButton>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProfileDetails;
