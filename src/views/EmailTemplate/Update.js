import React, { useEffect, useState } from "react";
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormSelect,
  CCardFooter,
  CFormInput,
  CFormLabel,
  CButton,
  CCardHeader,
} from "@coreui/react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "../../redux/toast/toast.action";
import { cilArrowLeft, cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

//import lib
import { decryptString } from "src/lib/cryptoJS";

//config
import config from "src/config";

//import api
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { getSingleTemplate, UpdateTemplate } from "src/api/template";
import { editEmailTemplateValidation } from "src/lib/validations";
import isEmpty from "src/lib/isEmpty";

const heightVar = window.innerHeight - 190;
const toolbarConfig = {
  height: heightVar,
  toolbar: "Full",
  allowedContent: true,
  startupFocus: true,
};

const intialFormValue = {
  identifier: "",
  subject: "",
  status: "",
  langCode: "",
  content: "",
};

const EmailTempUpdate = () => {
  //state
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(intialFormValue);
  const [error, setError] = useState({});
  const [Cdata, setContent] = useState("");

  const history = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { identifier, status, content, subject, langCode } = formValue;

  //function
  const handleChange = e => {
    e.preventDefault();
    let { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } };
    setFormValue(formData);
    if (value) {
      setError({});
    }
  };

  const handleEditorChange = (content) => {
    setContent(content)
  }

  const Submit = async e => {
    try {
      let decryptData = decryptString(id, true);
      let reqData = {
        id: decryptData,
        identifier,
        subject,
        content: Cdata|| "",
        langCode : "en",
        status,
      };
      const validErr = editEmailTemplateValidation(reqData);
    
      if(!isEmpty(validErr)){
        if (Object.keys(validErr).length > 0) {
          setError(validErr);
          return;
        }
      }
      console.log(validErr,reqData,"reqData");
      
      const { success, error, message } = await UpdateTemplate(reqData);
      if (success) {
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        setError({});
        history("/email-template-list");
      } else {
        if(error) {
          setError(error)
        }
        if(message) {
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
      console.log(err, "error");
    }
  };

  const fetchSingleTemplate = async () => {
    try {
      let decryptData = decryptString(id, true);
      const { success, result } = await getSingleTemplate(decryptData);
      if (success) {
        // console.log(result, 'result')
        let data = {
          identifier: result.identifier,
          subject: result.subject,
          status: result.status,
          langCode: result.langCode,
          content: result.content || "",
        };
        setContent(result.content);
        setFormValue(data);
      } else {
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    fetchSingleTemplate();
  }, []);

//   const DNXCustomUploadAdapterPlugin = editor => {
//     editor.plugins.get("FileRepository").createUploadAdapter = loader => {
//       // Configure the URL to the upload script in your back-end here!
//       loader.onUpload = editor.onUpload;
//       loader.accessToken = editor.accessToken;
//       return new Update(loader);
//     };
//   };

  return (
    <CRow>
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
            <CButton
              className="add-btn"
              onClick={() => navigate(-1)}
              style={{ "margin-right": "10px" }}
            >
              <CIcon icon={cilArrowLeft}></CIcon>
               Back
            </CButton>
          </div>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Identifier
                </CFormLabel>
                <CFormInput type="text" id="identifier" value={identifier} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Subject
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={handleChange}
                />
                <span className="text-danger">{error && error.subject}</span>
              </div>
              {/* <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option value="">Status</option>
                  <option value={'active'}>Active</option>
                  <option value={'deactive'}>Deactive</option>
                </CFormSelect>
                <span className="text-danger">{error && error.Status}</span>
              </div> */}
              {/* <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Language Code
                </CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="langCode"
                  value={langCode}
                  onChange={handleChange}
                >
                  <option value="">Language Code</option>
                  <option value={"en"}>en</option>
                </CFormSelect>
                <span className="text-danger">{error && error.langCode}</span>
              </div> */}
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Content
                </CFormLabel>
                <Editor
                  apiKey={config.TINY_MCE_EDITOR_API_KEY}
                  value={Cdata}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "code", // Add the code plugin
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                    ],
                    toolbar: "undo redo | blocks | bold italic | code", // Add code button to toolbar
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={handleEditorChange}
                />
                <span className="text-danger">{error && error.content}</span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={Submit}>
              Submit
            </CButton>
          </CCardFooter>{" "}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EmailTempUpdate;
