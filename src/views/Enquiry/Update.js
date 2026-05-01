import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea, CFormSelect, CButton, CRow, CCol } from "@coreui/react";
import { getEnquiryById, updateEnquiry } from "../../api/enquiry";

const UpdateEnquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "", context: "", status: "New"
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await getEnquiryById(id);
      if (res.success) {
        setFormData(res.result);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateEnquiry(id, { status: formData.status });
    if (res.success) {
      navigate("/enquiries");
    } else {
      alert("Error updating enquiry");
    }
  };

  return (
    <CCard>
      <CCardHeader><strong>Enquiry Details</strong></CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md="6"><CFormInput label="Name" disabled value={formData.name || ''} /></CCol>
            <CCol md="6"><CFormInput label="Email" disabled value={formData.email || ''} /></CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="6"><CFormInput label="Phone" disabled value={formData.phone || ''} /></CCol>
            <CCol md="6"><CFormInput label="Context / Property" disabled value={formData.context || ''} /></CCol>
          </CRow>
          <div className="mb-3"><CFormTextarea label="Message" disabled rows={4} value={formData.message || ''} /></div>
          <div className="mb-3">
            <CFormSelect label="Status" value={formData.status || ''} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </CFormSelect>
          </div>
          <CButton type="submit" color="primary" className="me-2">Update Status</CButton>
          <Link to="/enquiries" className="btn btn-secondary">Cancel</Link>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default UpdateEnquiry;
