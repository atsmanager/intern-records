import { useState } from "react";
import { type CandidateFormData } from "../types/candidate";
import { candidateAddApi } from "../api/candidateApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof typeof prev]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
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
        `${VITE_API_URL}/admin/check-mail?email=${formData.email.trim()}`,
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
              className="form-input"
              placeholder="Enter candidate phone no."
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">LinkedIn URL</label>
            <input
              type="text"
              className="form-input"
              placeholder="linkedin.com/in/..."
              name="linkedinURL"
              value={formData.linkedinURL}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Job Board</label>
            <input
              required
              type="text"
              className="form-input"
              placeholder="Enter job board name"
              name="jobBoard"
              value={formData.jobBoard}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Job Posted Date</label>
            <input
              required
              type="date"
              className="form-input"
              name="jobPostedDate"
              value={formData.jobPostedDate.slice(0, 10)}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Applied Date</label>
            <input
              required
              type="date"
              className="form-input"
              name="appliedDate"
              value={formData.appliedDate.slice(0, 10)}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Job Posted By</label>
            <input
              required
              type="text"
              className="form-input"
              placeholder="Posted by"
              name="jobPostedBy"
              value={formData.jobPostedBy}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Company</label>
            <input
              required
              type="text"
              className="form-input"
              placeholder="Enter Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Job Title</label>
            <input
              required
              type="text"
              className="form-input"
              placeholder="Enter job title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Interviewed By</label>
            <input
              required
              type="text"
              className="form-input"
              placeholder="Interviewed by"
              name="interviewedBy"
              value={formData.interviewedBy}
              onChange={handleChange}
            />
          </div>

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
