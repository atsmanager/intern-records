import { useState, useEffect } from "react";
import { type CandidateFormData, type Candidate } from "../types/candidate";
import { toast } from "react-hot-toast";
import { candidateEditApi } from "../api/candidateApi";

interface EditModalProps {
  candidate: Candidate;
  onClose: () => void;
  onUpdate: (candidate: Candidate) => void;
}

const EditModal = ({ candidate, onClose, onUpdate }: EditModalProps) => {
  const [editFormData, setEditFormData] = useState<CandidateFormData>({
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    linkedInProfile: candidate.linkedInProfile ?? "",
    linkedInAge: candidate.linkedInAge ?? undefined,
    linkedinURL: candidate.linkedinURL ?? "",
    status: candidate.status ?? "",
    joiningDate: candidate.joiningDate ?? "",
    duration: candidate.duration ?? "",
    jobBoard: candidate.jobBoard,
    jobPostedDate: candidate.jobPostedDate,
    appliedDate: candidate.appliedDate,
    jobPostedBy: candidate.jobPostedBy,
    offerLetterSent: candidate.offerLetterSent ?? "",
    offerLetterAccepted: candidate.offerLetterAccepted ?? "",
    candidateEnrolled: candidate.candidateEnrolled ?? "",
    fieldType: candidate.fieldType ?? "",
    comment: candidate.comment ?? "",
    company: candidate.company ?? "",
    jobTitle: candidate.jobTitle ?? "",
    interviewedBy: candidate.interviewedBy ?? "",
  });
  const [saving, setSaving] = useState(false);

  // Close on Escape key + lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name as keyof typeof prev]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = await candidateEditApi(candidate._id, editFormData);
      toast.success(data.message);
      onUpdate(data.updateCandidate);
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error updating candidate");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div
        className="edit-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit Candidate"
      >
        {/* Modal Header */}
        <div className="edit-modal-header">
          <div className="edit-modal-title-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <h2 className="edit-modal-title">Edit Candidate</h2>
          </div>
          <button className="edit-modal-close" onClick={onClose} title="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="edit-modal-body">

          {/* Section: Personal Information */}
          <div className="edit-modal-section">
            <h3 className="edit-modal-section-title">Personal Information</h3>
            <div className="edit-modal-grid">
              <div className="edit-modal-field">
                <label className="edit-modal-label">Name</label>
                <input className="edit-modal-input" type="text" name="name" value={editFormData.name} onChange={handleChange} placeholder="Full name" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Email</label>
                <input className="edit-modal-input" type="email" name="email" value={editFormData.email} onChange={handleChange} placeholder="Email address" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Phone</label>
                <input className="edit-modal-input" type="tel" name="phone" value={editFormData.phone} onChange={handleChange} placeholder="Phone number" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">LinkedIn Profile</label>
                <select className="edit-modal-select" name="linkedInProfile" value={editFormData.linkedInProfile || ""} onChange={handleChange}>
                  <option value="">Has Profile?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">LinkedIn URL</label>
                <input className="edit-modal-input" type="text" name="linkedinURL" value={editFormData.linkedinURL || ""} onChange={handleChange} placeholder="LinkedIn profile URL" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Interviewed By</label>
                <input className="edit-modal-input" type="text" name="interviewedBy" value={editFormData.interviewedBy} onChange={handleChange} placeholder="Interviewer name" />
              </div>
            </div>
          </div>

          {/* Section: Interview & Status */}
          <div className="edit-modal-section">
            <h3 className="edit-modal-section-title">Interview & Status</h3>
            <div className="edit-modal-grid">
              <div className="edit-modal-field">
                <label className="edit-modal-label">Interview Status</label>
                <select className="edit-modal-select" name="status" value={editFormData.status || ""} onChange={handleChange}>
                  <option value="">Select Status</option>
                  <option value="interested">Interested</option>
                  <option value="busy">Busy</option>
                  <option value="no response">No Response</option>
                  <option value="no incoming service">No Incoming Service</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Joining Date</label>
                <input className="edit-modal-input" type="date" name="joiningDate" value={editFormData.joiningDate?.slice(0, 10) || ""} onChange={handleChange} />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Duration</label>
                <select className="edit-modal-select" name="duration" value={editFormData.duration || ""} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="4 months">4 months</option>
                  <option value="5 months">5 months</option>
                  <option value="6 months">6 months</option>
                </select>
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Contact Duration</label>
                <select className="edit-modal-select" name="fieldType" value={editFormData.fieldType || ""} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
                </select>
              </div>
              <div className="edit-modal-field edit-modal-field--full">
                <label className="edit-modal-label">Comment</label>
                <textarea className="edit-modal-textarea" name="comment" value={editFormData.comment} onChange={handleChange} placeholder="Add a comment..." rows={3} />
              </div>
            </div>
          </div>

          {/* Section: Offer & Enrollment */}
          <div className="edit-modal-section">
            <h3 className="edit-modal-section-title">Offer & Enrollment</h3>
            <div className="edit-modal-grid">
              <div className="edit-modal-field">
                <label className="edit-modal-label">Offer Letter Sent</label>
                <select className="edit-modal-select" name="offerLetterSent" value={editFormData.offerLetterSent} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Offer Letter Accepted</label>
                <select className="edit-modal-select" name="offerLetterAccepted" value={editFormData.offerLetterAccepted} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Candidate Enrolled</label>
                <select className="edit-modal-select" name="candidateEnrolled" value={editFormData.candidateEnrolled} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Job Details */}
          <div className="edit-modal-section">
            <h3 className="edit-modal-section-title">Job Details</h3>
            <div className="edit-modal-grid">
              <div className="edit-modal-field">
                <label className="edit-modal-label">Job Title</label>
                <input className="edit-modal-input" type="text" name="jobTitle" value={editFormData.jobTitle} onChange={handleChange} placeholder="Job title" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Company</label>
                <input className="edit-modal-input" type="text" name="company" value={editFormData.company} onChange={handleChange} placeholder="Company name" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Job Board</label>
                <input className="edit-modal-input" type="text" name="jobBoard" value={editFormData.jobBoard} onChange={handleChange} placeholder="Job board" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Job Posted Date</label>
                <input className="edit-modal-input" type="date" name="jobPostedDate" value={editFormData.jobPostedDate?.slice(0, 10) || ""} onChange={handleChange} />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Posted By</label>
                <input className="edit-modal-input" type="text" name="jobPostedBy" value={editFormData.jobPostedBy} onChange={handleChange} placeholder="Posted by" />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Applicant Applied Date</label>
                <input className="edit-modal-input" type="date" name="appliedDate" value={editFormData.appliedDate?.slice(0, 10) || ""} onChange={handleChange} />
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="edit-modal-footer">
          <button className="edit-modal-btn-cancel" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button className="edit-modal-btn-save" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <span className="edit-modal-spinner" />
                Saving...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
