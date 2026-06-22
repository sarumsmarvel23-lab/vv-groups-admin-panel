import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea, CFormSelect, CButton } from "@coreui/react";
import { addStay } from "../../api/stay";
import { stayValidation, stayInputValidation } from "../../lib/validations";
import { toast } from "../../redux/toast/toast.action";

const EMPTY_ROOM = { name: "", sleeps: "", price: "" };

const AddStay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "", location: "", type: "Homestay", pricePerNight: 0, rating: 0,
    reviews: 0, description: "", amenities: "", status: "Active", youtubeLink: ""
  });
  const [rooms, setRooms] = useState([{ ...EMPTY_ROOM }]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputKey, setInputKey] = useState(Date.now());

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    const validationErrors = stayInputValidation(id, value);
    setErrors({ ...errors, [id]: validationErrors[id] || "" });
  };

  // Room handlers
  const handleRoomChange = (idx, field, value) => {
    setRooms((prev) => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const addRoom = () => setRooms((prev) => [...prev, { ...EMPTY_ROOM }]);

  const removeRoom = (idx) => {
    if (rooms.length === 1) return; // keep at least one row
    setRooms((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = stayValidation(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    // Serialize rooms as JSON string (backend will parse it)
    const validRooms = rooms.filter(r => r.name.trim());
    data.append("rooms", JSON.stringify(validRooms));

    if (image) data.append("image", image);
    if (video) data.append("videoUrl", video);
    if (gallery.length) {
      Array.from(gallery).forEach(file => data.append("gallery", file));
    }

    const res = await addStay(data);
    if (res.success) {
      toast({ type: "success", message: "Stay added successfully!" }, dispatch);
      navigate("/stays");
    } else {
      toast({ type: "error", message: res.message || "Error adding stay" }, dispatch);
    }
  };

  return (
    <CCard>
      <CCardHeader><strong>Add Stay</strong></CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormInput id="name" label="Name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <CFormTextarea id="description" rows={3} label="Description" value={formData.description} onChange={handleChange} />
            {errors.description && <span className="text-danger">{errors.description}</span>}
          </div>
          <div className="mb-3">
            <CFormInput id="location" label="Location" value={formData.location} onChange={handleChange} />
            {errors.location && <span className="text-danger">{errors.location}</span>}
          </div>
          <div className="mb-3">
            <CFormSelect id="type" label="Type" value={formData.type} onChange={handleChange}>
              <option value="Heritage Hotel">Heritage Hotel</option>
              <option value="Homestay">Homestay</option>
              <option value="Villa">Villa</option>
              <option value="Resort">Resort</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormInput id="pricePerNight" type="number" label="Price Per Night (₹)" value={formData.pricePerNight} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormInput id="rating" type="number" step="0.1" min="0" max="10" label="Rating (e.g. 9.2)" value={formData.rating} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormInput id="reviews" type="number" label="Number of Reviews" value={formData.reviews} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormInput id="amenities" label="Amenities (comma-separated, e.g. Pool, Wifi, Spa)" value={formData.amenities} onChange={handleChange} />
            <small className="text-muted">Separate each amenity with a comma.</small>
          </div>

          {/* ── Rooms ── */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Rooms</label>
            {rooms.map((room, idx) => (
              <div
                key={idx}
                className="rounded p-3 mb-2"
                style={{ background: "#2a2d32", border: "1px solid #444" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="fw-semibold" style={{ color: "#fff" }}>Room {idx + 1}</small>
                  {rooms.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger py-0 px-2"
                      onClick={() => removeRoom(idx)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
                <div className="row g-2">
                  <div className="col-md-5">
                    <label className="text-white small mb-1">Room Name</label>
                    <CFormInput
                      placeholder="e.g. Deluxe Suite"
                      value={room.name}
                      onChange={(e) => handleRoomChange(idx, "name", e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="text-white small mb-1">Sleeps (guests)</label>
                    <CFormInput
                      type="number"
                      placeholder="e.g. 2"
                      min={1}
                      value={room.sleeps}
                      onChange={(e) => handleRoomChange(idx, "sleeps", e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-white small mb-1">Price / Night (₹)</label>
                    <CFormInput
                      type="number"
                      placeholder="e.g. 15000"
                      min={0}
                      value={room.price}
                      onChange={(e) => handleRoomChange(idx, "price", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <CButton type="button" color="secondary" size="sm" onClick={addRoom}>
              + Add Room
            </CButton>
          </div>

          <div className="mb-3">
            <CFormSelect id="status" label="Status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </CFormSelect>
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
          <Link to="/stays" className="btn btn-secondary">Cancel</Link>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default AddStay;
