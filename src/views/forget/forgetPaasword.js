import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CFormLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

//import api
import { forgotPasswordApi } from "../../api/auth";

//import action
import { toast } from "../../redux/toast/toast.action";

const intailValue = {
  email: "",
};

const ForgetPassword = () => {
  const [formValue, setFormValue] = useState(intailValue);
  const [validateError, setValidateError] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email } = formValue;
  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoader(true);
      let reqData = {
        email,
      };
      const { success, message, errors } = await forgotPasswordApi(reqData);
      if (success) {
        setValidateError({});
        setLoader(false);

        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        navigate("/login");
      } else {
        if (errors) {
          setLoader(false);
          if (errors) {
            setValidateError(errors);
          } else {
            toast(
              {
                message: message,
                type: "error",
              },
              dispatch
            );
          }
        }
      }
    } catch (err) {}
  };

  return (
    <div className="bg-light-purple min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <div className="login-brand">
          <img
            src={"/logo.png"}
            className="img img-fluid"
          ></img>
        </div>
        <CRow className="justify-content-center">
          <CCol md={8} lg={7} xl={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h3 className="crediantial-title">Forgot Password</h3>
                  <CForm>
                    <CFormLabel>Email</CFormLabel>
                    <CInputGroup className="mb-4 align_ment">
                      <CInputGroupText>
                        <i className="bi bi-person-fill"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <span className="text-danger">{validateError.email}</span>

                    <CRow>
                      <CCol xs={12}>
                        {loader && (
                          <CButton disabled color="primary" className="btn-big">
                            <CSpinner
                              component="span"
                              size="sm"
                              variant="grow"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Loading...
                          </CButton>
                        )}
                        {!loader && (
                          <CButton
                            color="primary"
                            className="btn-big"
                            onClick={handleSubmit}
                          >
                            Submit
                          </CButton>
                        )}
                      </CCol>
                    </CRow>
                    <div className="text-center mt-3">
                      <Link to={"/login"}>Login</Link>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/login">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Login{' '}
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgetPassword;
