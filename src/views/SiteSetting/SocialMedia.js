import React, { useEffect, useRef, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CFormLabel,
  CFormInput,
  CImage,
  CButton,
  CCol,
  CRow,
  CForm,
  CFormCheck,
} from "@coreui/react";
import PropTypes from "prop-types";
import { toast } from "../../redux/toast/toast.action";
import { useDispatch, useSelector } from "react-redux";
//import api
import { updateSiteDetail } from "src/api/sitesetting";
//import config
import config from "../../config/index";
import { settingsValidation } from "src/lib/validations";
const intialFormValue = {

  siteName: "",
  contactNo: "",
  supportMail: "",
  address: "",
  emailLogo: "",
  whatsappLink: "",
  maintenance: "false",
  loader: false,
};

const SocialMedia = props => {
  const { record, fetchSetting } = props;

  //state
  const { role, currentPageAccess } = useSelector(state => state.role);
  const [formValue, setFormValue] = useState(intialFormValue);
  const [error, setError] = useState({});
  const [imageShow, setImageShow] = useState("");
  const [oldImage, setOldImage] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const {

    siteName,
    address,
    contactNo,

    whatsappLink,
    emailLogo,
    supportMail,

    maintenance,
    loader,
  } = formValue;
  //function
  const handleChange = e => {
    e.preventDefault();
    // if(!currentPageAccess?.canEdit) {
    //   return toast(
    //     {
    //       message: "You don't have permission to edit",
    //       type: "error",
    //     },
    //     dispatch
    //   );
    // }

    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } };
    setFormValue(formData);
    let formDataerr = { ...error, ...{ [id]: "" } };
    setError(formDataerr);
  };

  const handleFile = e => {
    e.preventDefault();
    const { name, files } = e.target;
    let formData = { ...formValue, ...{ [name]: files[0] } };
    setFormValue(formData);
    setImageShow(URL.createObjectURL(files[0]));
  };

  const Submit = async e => {
    try {
      const reqData = {

        siteName,
        address,
        contactNo,
        supportMail,

        whatsappLink,
        emailLogo,
      }
      const validErr = settingsValidation(reqData);
      console.log('validErr: ', validErr);
      if (validErr) {
        if (Object.keys(validErr).length > 0) {
          setError(validErr);
          return;
        }
      }

      const formData = new FormData();

      formData.append("siteName", siteName);
      formData.append("address", address);


      formData.append("contactNo", contactNo);
      formData.append("supportMail", supportMail);
      formData.append("emailLogo", emailLogo);
      formData.append("whatsappLink", whatsappLink);

      formData.append("maintenance", maintenance);
      formData.append("oldImage", oldImage);

      const { success, errors, message } = await updateSiteDetail(formData);
      if (success) {
        fetchSetting()
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        setError({});
      } else if (errors) {
        setError(errors);
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    if (record && record !== undefined && record !== "") {
      let data = {

        siteName: record.siteName,
        address: record.address,
        contactNo: record.contactNo,
        supportMail: record.supportMail,
        emailLogo: record.emailLogo,
        whatsappLink: record.whatsappLink,

        maintenance: record?.maintenance
          ? record.maintenance.toString()
          : "false",
      };
      setFormValue(data);
      setOldImage(record.emailLogo);

    }
  }, [record]);

  return (
    <>
      <CCard>
        <CCardBody>
          <CForm className="row g-3">
            {/* <CCol md={6}>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Twitter Link
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="twiterLink"
                  value={twiterLink}
                  onChange={handleChange}
                />
                <span className="text-danger">{error && error.twiterLink}</span>
              </CCol> */}
            {/* <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Facebook Link{" "}
              </CFormLabel>

              <CFormInput
                type="text"
                id="fbLink"
                value={fbLink}
                onChange={handleChange}
              />
              <span className="text-danger">{error && error.fbLink}</span>
            </CCol> */}
            {/* <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Instagram Link{" "}
              </CFormLabel>

              <CFormInput
                type="text"
                id="instaLink"
                value={instaLink}
                onChange={handleChange}
              />
              <span className="text-danger">{error && error.instaLink}</span>
            </CCol> */}
            {/* <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Telegram Link
              </CFormLabel>
              <CFormInput
                type="text"
                id="telegramLink"
                value={telegramLink}
                onChange={handleChange}
              />
              <span className="text-danger">{error.telegramLink}</span>
            </CCol> */}
            {/* <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Youtube Link
              </CFormLabel>

              <CFormInput
                type="text"
                id="youtubeLink"
                value={youtubeLink}
                onChange={handleChange}
              />
              <span className="text-danger">{error && error.youtubeLink}</span>
            </CCol> */}
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Whatsapp Link
              </CFormLabel>

              <CFormInput
                type="text"
                id="whatsappLink"
                value={whatsappLink}
                onChange={handleChange}
              />
              <span className="text-danger">{error.whatsappLink}</span>
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Site Name{" "}
              </CFormLabel>

              <CFormInput
                type="text"
                id="siteName"
                value={siteName}
                onChange={handleChange}
              />
              <span className="text-danger">{error && error.siteName}</span>
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Address{" "}
              </CFormLabel>

              <CFormInput
                type="text"
                id="address"
                value={address}
                onChange={handleChange}
              />
              <span className="text-danger">{error && error.address}</span>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                contactNo{" "}
              </CFormLabel>
              <CFormInput
                type="text"
                id="contactNo"
                value={contactNo}
                onChange={handleChange}
              />
              <span className="text-danger">{error && error.contactNo}</span>{" "}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Support Email{" "}
              </CFormLabel>
              <CFormInput
                type="text"
                id="supportMail"
                value={supportMail}
                onChange={handleChange}
              />
              <span className="text-danger">{error && error.supportMail}</span>{" "}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword" className="col-form-label">
                Site Logo
              </CFormLabel>

              {/* <CFormInput type="file" id="emailLogo" onChange={handleFile} /> */}
              <div className="input-group btn-file-group">
                <span className="input-group-btn">
                  <label className="btn btn-secondary btn-file">
                    <div className="input required">
                      <input
                        type="file"
                        name="emailLogo"
                        ref={fileInputRef}
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFile}
                      />
                    </div>{" "}
                    <span className="browse-btn">Browse</span>
                  </label>
                </span>
                <span className="file-input-label"></span>
              </div>
              {imageShow && (
                <CImage
                  className="logoPreview"
                  rounded
                  src={imageShow}
                  width={80}
                  height={80}
                />
              )}
              {emailLogo && !imageShow && (
                <CImage
                  className="logoPreview"
                  rounded
                  src={emailLogo.startsWith('http') ? emailLogo : `${config.imgUrl}${emailLogo}`}
                  width={80}
                  height={80}
                />
              )}
              <div>
                <span className="text-danger">{error && error.emailLogo}</span>
              </div>
            </CCol>

          </CForm>
        </CCardBody>
        {currentPageAccess?.canEdit && (
          <CCardFooter>
            <CButton className="btn btn-primary m-0 mt-3" onClick={Submit}>
              Submit
            </CButton>
          </CCardFooter>
        )}
      </CCard>
    </>
  );
};

SocialMedia.propTypes = {
  record: PropTypes.any,
};

export default SocialMedia;
