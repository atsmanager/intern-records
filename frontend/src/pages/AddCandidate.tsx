import { useState } from "react";
import { type CandidateFormData } from "../types/candidate";
import { candidateAddApi } from "../api/candidateApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useSettingsStore } from "../store/settingsStore";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const AddCandidate = () => {
  const [formData, setFormData] = useState<CandidateFormData>({
    name: "",
    email: "",
    phone: "",
    linkedInProfile: "",
    linkedInAge: undefined,
    linkedinURL: "",
    status: "",
    joiningDate: "",
    duration: "",
    jobBoard: "",
    jobPostedDate: "",
    appliedDate: "",
    jobPostedBy: "",
    offerLetterSent: "",
    offerLetterAccepted: "",
    candidateEnrolled: "",
    fieldType: "",
    comment: "",
    company: "",
    jobTitle: "",
    interviewedBy: "",
  });

  const navigate = useNavigate();
  const [mailValidity, setMailValidity] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { fieldSettings } = useSettingsStore();
  const fs = fieldSettings; // shorthand

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Allow only digits, +, spaces, hyphens
      const cleaned = value.replace(/[^\d+\s\-]/g, "");
      setFormData((prev) => ({ ...prev, phone: cleaned }));
      // Validate: strip country code prefix for digit count
      const digitsOnly = cleaned.replace(/^\+91\s?|^0/, "").replace(/\D/g, "");
      if (cleaned === "") {
        setPhoneError("");
      } else if (digitsOnly.length < 10) {
        setPhoneError("Phone number must have at least 10 digits.");
      } else if (digitsOnly.length > 10) {
        setPhoneError("Phone number must not exceed 10 digits.");
      } else {
        setPhoneError("");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name as keyof typeof prev]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (phoneError) {
      return;
    }
    try {
      const data = await candidateAddApi(formData);
      if (data) {
        toast.success(data.message);
        navigate("/all-candidate");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error adding candidate");
    }
  };

  const checkMail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${VITE_API_URL}/admin/check-mail?email=${formData.email.trim()}&company=${formData.company.trim()}`,
        { method: "GET", credentials: "include" }
      );
      const res = await response.json();
      setMailValidity(res.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-page">
      <div style={{ width: "100%", maxWidth: "680px", display: "flex", justifyContent: "flex-end", marginBottom: "-8px" }}>
        <Link to="/import-candidate">
          <button className="btn-nav-primary">
            📁 Import from Excel →
          </button>
        </Link>
      </div>

      {/* Manual form */}
      <div className="form-card">
        <h2 className="form-card-title">Add Candidate</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Name</label>
            <input
              required
              type="text"
              className="form-input"
              placeholder="Enter candidate name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              required
              type="email"
              className="form-input"
              placeholder="Enter candidate email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {mailValidity && <p className="mail-validity">{mailValidity}</p>}

          <div style={{ marginBottom: "16px" }}>
            <button
              type="button"
              className="btn-nav-primary"
              onClick={checkMail}
            >
              Verify Email
            </button>
          </div>

          <div className="form-field">
            <label className="form-label">Phone</label>
            <input
              required
              type="tel"
              className={`form-input${phoneError ? " input-error" : ""}`}
              placeholder="e.g. +91 9876543210 or 9876543210"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {phoneError && (
              <span className="field-error-msg">{phoneError}</span>
            )}
          </div>

          {fs.linkedinURL.enabled && (
            <div className="form-field">
              <label className="form-label">
                LinkedIn URL
                {!fs.linkedinURL.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="linkedin.com/in/..."
                name="linkedinURL"
                value={formData.linkedinURL}
                onChange={handleChange}
                required={fs.linkedinURL.required}
              />
            </div>
          )}

          {fs.jobBoard.enabled && (
            <div className="form-field">
              <label className="form-label">
                Job Board
                {!fs.jobBoard.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter job board name"
                name="jobBoard"
                value={formData.jobBoard}
                onChange={handleChange}
                required={fs.jobBoard.required}
              />
            </div>
          )}

          {fs.jobPostedDate.enabled && (
            <div className="form-field">
              <label className="form-label">
                Job Posted Date
                {!fs.jobPostedDate.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="date"
                className="form-input"
                name="jobPostedDate"
                value={formData.jobPostedDate.slice(0, 10)}
                onChange={handleChange}
                required={fs.jobPostedDate.required}
              />
            </div>
          )}

          {fs.appliedDate.enabled && (
            <div className="form-field">
              <label className="form-label">
                Applied Date
                {!fs.appliedDate.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="date"
                className="form-input"
                name="appliedDate"
                value={formData.appliedDate.slice(0, 10)}
                onChange={handleChange}
                required={fs.appliedDate.required}
              />
            </div>
          )}

          {fs.jobPostedBy.enabled && (
            <div className="form-field">
              <label className="form-label">
                Job Posted By
                {!fs.jobPostedBy.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Posted by"
                name="jobPostedBy"
                value={formData.jobPostedBy}
                onChange={handleChange}
                required={fs.jobPostedBy.required}
              />
            </div>
          )}

          {fs.company.enabled && (
            <div className="form-field">
              <label className="form-label">
                Company
                {!fs.company.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required={fs.company.required}
              />
            </div>
          )}

          {fs.jobTitle.enabled && (
            <div className="form-field">
              <label className="form-label">
                Job Title
                {!fs.jobTitle.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter job title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required={fs.jobTitle.required}
              />
            </div>
          )}

          {fs.interviewedBy.enabled && (
            <div className="form-field">
              <label className="form-label">
                Interviewed By
                {!fs.interviewedBy.required && <span className="form-label-optional">Optional</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Interviewed by"
                name="interviewedBy"
                value={formData.interviewedBy}
                onChange={handleChange}
                required={fs.interviewedBy.required}
              />
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
            <button type="submit" className="form-submit">
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
