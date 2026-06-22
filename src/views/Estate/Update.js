import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea, CFormSelect, CButton } from "@coreui/react";
import { getEstateById, updateEstate } from "../../api/estate";
import { estateValidation, estateInputValidation } from "../../lib/validations";
import { toast } from "../../redux/toast/toast.action";
import config from "../../config";

const UpdateEstate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "", description: "", type: "Apartment", price: "", location: "",
    area: "", bedrooms: 0, bathrooms: 0, furnished: "Unfurnished", status: "Active",
    amenities: "", youtubeLink: ""
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputKey, setInputKey] = useState(Date.now());

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    const validationErrors = estateInputValidation(id, value);
    setErrors({ ...errors, [id]: validationErrors[id] || "" });
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getEstateById(id);
      if (res.success) {
        const d = res.result;
        // Convert amenities array back to comma string for the input
        if (Array.isArray(d.amenities)) d.amenities = d.amenities.join(", ");
        setFormData(d);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = estateValidation(formData);
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

    // Handle Video
    if (video) {
      data.append("videoUrl", video);
    } else if (formData.videoUrl) {
      data.append("videoUrl", formData.videoUrl);
    }

    // Handle Gallery
    if (gallery.length) {
      Array.from(gallery).forEach(file => data.append("gallery", file));
    } else if (formData.gallery && Array.isArray(formData.gallery)) {
      formData.gallery.forEach(img => data.append("gallery", img));
    }

    const res = await updateEstate(id, data);
    if (res.success) {
      toast({ type: "success", message: "Estate updated successfully!" }, dispatch);
      navigate("/estates");
    } else {
      toast({ type: "error", message: res.message || "Error updating estate" }, dispatch);
    }
  };

  return (
    <CCard>
      <CCardHeader><strong>Update Estate</strong></CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormInput id="title" label="Title" value={formData.title || ''} onChange={handleChange} />
            {errors.title && <span className="text-danger">{errors.title}</span>}
          </div>
          <div className="mb-3">
            <CFormTextarea id="description" rows={3} label="Description" value={formData.description || ''} onChange={handleChange} />
            {errors.description && <span className="text-danger">{errors.description}</span>}
          </div>
          <div className="mb-3">
            <CFormSelect id="type" label="Type" value={formData.type || ''} onChange={handleChange}>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Heritage">Heritage</option>
              <option value="Commercial">Commercial</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormInput id="price" label="Price (e.g. ₹2.5 Cr)" value={formData.price || ''} onChange={handleChange} />
            {errors.price && <span className="text-danger">{errors.price}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="location" label="Location" value={formData.location || ''} onChange={handleChange} />
            {errors.location && <span className="text-danger">{errors.location}</span>}
          </div>
          <div className="mb-3"><CFormInput id="area" label="Area" value={formData.area || ''} onChange={handleChange} /></div>
          <div className="mb-3">
            <CFormInput id="bedrooms" type="number" label="Bedrooms" value={formData.bedrooms || 0} onChange={handleChange} />
            {errors.bedrooms && <span className="text-danger">{errors.bedrooms}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="bathrooms" type="number" label="Bathrooms" value={formData.bathrooms || 0} onChange={handleChange} />
            {errors.bathrooms && <span className="text-danger">{errors.bathrooms}</span>}
          </div>
          <div className="mb-3">
            <CFormSelect id="furnished" label="Furnished" value={formData.furnished || ''} onChange={handleChange}>
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormSelect id="status" label="Status" value={formData.status || ''} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Sold">Sold</option>
              <option value="Inactive">Inactive</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormInput id="amenities" label="Amenities (comma-separated)" value={formData.amenities || ''} onChange={handleChange} />
            <small >Separate each amenity with a comma.</small>
          </div>
          <div className="mb-3">
            <CFormInput id="videoUrl" type="file" label="Update Video (Optional)" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
            {formData.videoUrl && <small className="text-muted d-block mt-1">Current video: {formData.videoUrl}</small>}
          </div>
          <div className="mb-3">
            <CFormInput id="youtubeLink" label="Update Youtube Link (Optional)" value={formData.youtubeLink || ''} onChange={handleChange} />
            {errors.youtubeLink && <span className="text-danger">{errors.youtubeLink}</span>}
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
          <Link to="/estates" className="btn btn-secondary">Cancel</Link>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default UpdateEstate;
