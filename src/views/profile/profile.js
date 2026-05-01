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
  CSpinner,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react";

//import api
import { updateProfile, getAdminProfile } from "../../api/user";

//import action
import { toast } from "../../redux/toast/toast.action";
import { logout } from "../../redux/auth/auth.action";
import { profileValidation } from "src/lib/validations";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

const initialFormValue = {
  name: "",
  email: "",
  password: "",
  showPass: false,
};

const ProfileDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  //state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validErr, setValidErr] = useState({});
  const [loader, setLoader] = useState(false);

  const { email, name, password, showPass } = formValue;

  //function
  const handleChange = e => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, ...{ [name]: value } });
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: "" } };
      setValidErr(formDataerr);
    }
  };
  const handleSubmit = async () => {
    try{
      setLoader(true);
      let data = {
        email,
        name,
        password,
      };
      const validErr = profileValidation(data);
      if(validErr){
        if (Object.keys(validErr).length > 0) {
          setValidErr(validErr);
          setLoader(false);
        }
        return;
      }
      let { success, message, errors } = await updateProfile(data);
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
        if (errors) {
          setLoader(false);
          setValidErr(errors);
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
    }catch(err){
      console.log(err);
    }finally { 
      setLoader(false); 
    }
  };
  const fetchProfile = async () => {
    const { success, result } = await getAdminProfile();
    console.log(success,result,"resulyttt");
    if (success) {
      let formData = {};
      formData.name = result?.name;
      formData.email = result?.email;
      formData.phoneNumber = result?.phoneNumber;
      setFormValue(formData);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
                  Enter Name
                </CFormLabel>
                <CFormInput
                  type="text"
                  size="sm"
                  aria-label="sm input example"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.name}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter Email Address
                </CFormLabel>
                <CFormInput
                  type="email"
                  size="sm"
                  aria-label="Quote Currency Decimal"
                  value={email}
                  name="email"
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {validErr && validErr.email}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter Login Password
                </CFormLabel>
                <CInputGroup className="mb-3 align_ment bddr">
                  <CFormInput
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={password}
                    autoComplete="new-password"
                    placeholder="password"
                    onChange={handleChange}
                  />
                  <CInputGroupText>
                    <i
                      className={
                        showPass ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                      }
                      onClick={() =>
                        setFormValue({
                          ...formValue,
                          ...{ ["showPass"]: !showPass },
                        })
                      }
                    ></i>
                  </CInputGroupText>
                </CInputGroup>
                <span className="text-danger">
                  {validErr && validErr.password}
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
              <CButton className="submit-btn" onClick={handleSubmit}>
                Update
              </CButton>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProfileDetails;
