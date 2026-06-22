import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea, CFormSelect, CButton } from "@coreui/react";
import { addEstate } from "../../api/estate";
import { estateValidation, estateInputValidation } from "../../lib/validations";
import { toast } from "../../redux/toast/toast.action";

const AddEstate = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = estateValidation(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append("image", image);
    if (video) data.append("videoUrl", video);
    if (gallery.length) {
      Array.from(gallery).forEach(file => data.append("gallery", file));
    }

    const res = await addEstate(data);
    if (res.success) {
      toast({ type: "success", message: "Estate added successfully!" }, dispatch);
      navigate("/estates");
    } else {
      toast({ type: "error", message: res.message || "Error adding estate" }, dispatch);
    }
  };

  return (
    <CCard>
      <CCardHeader><strong>Add Estate</strong></CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormInput id="title" label="Title" value={formData.title} onChange={handleChange} />
            {errors.title && <span className="text-danger">{errors.title}</span>}
          </div>
          <div className="mb-3">
            <CFormTextarea
              id="description"
              rows={3}
              label="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-100"
            />
            {errors.description && (
              <span className="text-danger">{errors.description}</span>
            )}
          </div>
          <div className="mb-3">
            <CFormSelect id="type" label="Type" value={formData.type} onChange={handleChange}>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Heritage">Heritage</option>
              <option value="Commercial">Commercial</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormInput id="price" label="Price (e.g. ₹2.5 Cr)" value={formData.price} onChange={handleChange} />
            {errors.price && <span className="text-danger">{errors.price}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="location" label="Location" value={formData.location} onChange={handleChange} />
            {errors.location && <span className="text-danger">{errors.location}</span>}
          </div>
          <div className="mb-3"><CFormInput id="area" label="Area (e.g. 2,500 sq ft)" value={formData.area} onChange={handleChange} /></div>
          <div className="mb-3">
            <CFormInput id="bedrooms" type="number" label="Bedrooms" value={formData.bedrooms} onChange={handleChange} />
            {errors.bedrooms && <span className="text-danger">{errors.bedrooms}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="bathrooms" type="number" label="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
            {errors.bathrooms && <span className="text-danger">{errors.bathrooms}</span>}
          </div>
          <div className="mb-3">
            <CFormSelect id="furnished" label="Furnished" value={formData.furnished} onChange={handleChange}>
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormSelect id="status" label="Status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Sold">Sold</option>
              <option value="Inactive">Inactive</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormInput id="amenities" label="Amenities (comma-separated, e.g. Pool, Gym, Parking)" value={formData.amenities} onChange={handleChange} />
            <small >Separate each amenity with a comma.</small>
          </div>
          <div className="mb-3">
            <CFormInput id="videoUrl" type="file" label="Upload Video (Optional)" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
          </div>
          <div className="mb-3">
            <CFormInput id="youtubeLink" label="Youtube Link (Optional)" value={formData.youtubeLink} onChange={handleChange} />
            {errors.youtubeLink && <span className="text-danger">{errors.youtubeLink}</span>}
          </div>
          <div className="mb-3">
            <CFormInput type="file" label="Main Image" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            {image && <img src={URL.createObjectURL(image)} alt="Preview" className="img-thumbnail mt-2" width="150" />}
          </div>
          <div className="mb-3">
            <CFormInput
              key={inputKey}
              type="file"
              label="Gallery Images"
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
          </div>
          <CButton type="submit" color="primary" className="me-2">Save</CButton>
          <Link to="/estates" className="btn btn-secondary">Cancel</Link>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default AddEstate;
