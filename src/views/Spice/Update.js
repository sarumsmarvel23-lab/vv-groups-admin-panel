import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea, CButton } from "@coreui/react";
import { getSpiceById, updateSpice } from "../../api/spice";
import { spiceValidation, spiceInputValidation } from "../../lib/validations";
import { toast } from "../../redux/toast/toast.action";
import config from "../../config";

const UpdateSpice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "", description: "", origin: "", grade: "", pricePerKg: "",
    moisture: "", minOrder: "", packaging: ""
  });
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputKey, setInputKey] = useState(Date.now());

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    const validationErrors = spiceInputValidation(id, value);
    setErrors({ ...errors, [id]: validationErrors[id] || "" });
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getSpiceById(id);
      if (res.success) {
        const d = res.result;
        // Convert packaging array back to comma string
        if (Array.isArray(d.packaging)) d.packaging = d.packaging.join(", ");
        setFormData(d);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = spiceValidation(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'image' && key !== 'gallery' && key !== 'videoUrl' && key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v') {
        data.append(key, formData[key]);
      }
    });

    // Handle Main Image
    if (image) {
      data.append("image", image);
    } else if (formData.image) {
      data.append("image", formData.image);
    }

    // Handle Gallery
    if (gallery.length) {
      Array.from(gallery).forEach(file => data.append("gallery", file));
    } else if (formData.gallery && Array.isArray(formData.gallery)) {
      formData.gallery.forEach(img => data.append("gallery", img));
    }

    const res = await updateSpice(id, data);
    if (res.success) {
      toast({ type: "success", message: "Spice updated successfully!" }, dispatch);
      navigate("/spices");
    } else {
      toast({ type: "error", message: res.message || "Error updating spice" }, dispatch);
    }
  };

  return (
    <CCard>
      <CCardHeader><strong>Update Spice</strong></CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormInput id="name" label="Name" value={formData.name || ''} onChange={handleChange} />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <CFormTextarea id="description" rows={3} label="Description" value={formData.description || ''} onChange={handleChange} />
            {errors.description && <span className="text-danger">{errors.description}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="origin" label="Origin" value={formData.origin || ''} onChange={handleChange} />
            {errors.origin && <span className="text-danger">{errors.origin}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="grade" label="Grade" value={formData.grade || ''} onChange={handleChange} />
            {errors.grade && <span className="text-danger">{errors.grade}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="pricePerKg" type="number" label="Price Per Kg (₹)" value={formData.pricePerKg || ''} onChange={handleChange} />
            {errors.pricePerKg && <span className="text-danger">{errors.pricePerKg}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="moisture" label="Moisture (e.g. 8% max)" value={formData.moisture || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormInput id="minOrder" label="Minimum Order" value={formData.minOrder || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormInput id="packaging" label="Packaging Options (comma-separated)" value={formData.packaging || ''} onChange={handleChange} />
            <small>Separate each option with a comma.</small>
          </div>
          <div className="mb-3">
            <CFormInput type="file" label="Update Main Image" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Preview" className="img-thumbnail mt-2" width="150" />
            ) : formData.image ? (
              <img src={`${config.imgUrl}${formData.image}`} alt="Current" className="img-thumbnail mt-2" width="150" />
            ) : null}
          </div>
          <div className="mb-3">
            <CFormInput
              key={inputKey}
              type="file"
              label="Update Gallery Images"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setGallery((prev) => {
                  const updated = [...prev, ...files];
                  if (updated.length > 5) {
                    toast({ type: "error", message: "Maximum 5 images allowed" }, dispatch);
                    return updated.slice(0, 5);
                  }
                  return updated;
                });
                setInputKey(Date.now());
              }}
            />
            {gallery.length > 0 && (
              <div className="d-flex flex-wrap mt-2 gap-2">
                {gallery.map((file, idx) => (
                  <div key={idx} style={{ position: "relative" }}>
                    <img src={URL.createObjectURL(file)} alt={`Preview ${idx}`} className="img-thumbnail" width="100" style={{ height: "100px", objectFit: "cover" }} />
                    <button type="button" onClick={() => setGallery((prev) => prev.filter((_, i) => i !== idx))} style={{ position: "absolute", top: "-5px", right: "-5px", background: "red", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", fontSize: "14px" }}>×</button>
                  </div>
                ))}
              </div>
            )}
            {formData.gallery && formData.gallery.length > 0 && gallery.length === 0 && (
              <div className="d-flex flex-wrap mt-2 gap-2">
                {formData.gallery.map((imgUrl, idx) => (
                  <img key={idx} src={`${config.imgUrl}${imgUrl}`} alt={`Current ${idx}`} className="img-thumbnail" width="100" />
                ))}
              </div>
            )}
          </div>
          <CButton type="submit" color="primary" className="me-2">Update</CButton>
          <Link to="/spices" className="btn btn-secondary">Cancel</Link>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default UpdateSpice;
