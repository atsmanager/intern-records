import { useState } from "react";
import { type Candidate } from "../types/candidate";

interface ReadOnlyRowProps {
  candidate: Candidate;
  onDelete: (id: string) => void;
  onEdit: (candidate: Candidate) => void;
}

const ReadOnlyRow = ({ candidate, onDelete, onEdit }: ReadOnlyRowProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirm = () => {
    setShowConfirm(false);
    onDelete(candidate._id);
  };

  return (
    <>
      {/* Delete confirmation modal */}
      {showConfirm && (
        <div className="confirm-modal-overlay" onClick={handleCancel}>
          <div
            className="confirm-modal"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-label="Confirm delete"
          >
            {/* Warning icon */}
            <div className="confirm-modal-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>

            <h3 className="confirm-modal-title">Delete Applicant?</h3>
            <p className="confirm-modal-message">
              Are you sure you want to delete this Applicant?
            </p>
            <p className="confirm-modal-name">"{candidate.name}"</p>
            <p className="confirm-modal-subtext">This action cannot be undone.</p>

            <div className="confirm-modal-actions">
              <button className="confirm-modal-btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="confirm-modal-btn-delete" onClick={handleConfirm}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <tr key={candidate._id}>
        <td>
          <div className="tbl-actions">
            <button className="btn-tbl-edit" onClick={() => onEdit(candidate)} title="Edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button className="btn-tbl-delete" onClick={handleDeleteClick} title="Delete">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </td>
        <td>{candidate.name}</td>
        <td>{candidate.email}</td>
        <td>{candidate.phone}</td>
        <td>
          {candidate.linkedinURL ? (
            <a href={candidate.linkedinURL} target="_blank" rel="noopener noreferrer">
              {candidate?.linkedInProfile || "Pending..."}
            </a>
          ) : (
            candidate?.linkedInProfile || "Pending..."
          )}
        </td>
        <td>{candidate?.status || "Pending..."}</td>
        <td>{candidate?.comment || "Pending..."}</td>
        <td>
          {candidate.joiningDate && !isNaN(Date.parse(candidate.joiningDate))
            ? new Date(candidate.joiningDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </td>
        <td>{candidate.duration || "N/A"}</td>
        <td>{candidate?.fieldType || "Pending..."}</td>
        <td>{candidate?.offerLetterSent || "Pending..."}</td>
        <td>{candidate?.offerLetterAccepted || "Pending..."}</td>
        <td>{candidate?.candidateEnrolled || "Pending..."}</td>
        <td>{candidate.jobTitle || "N/A"}</td>
        <td>{candidate.company || "N/A"}</td>
        <td>{candidate.jobBoard || "N/A"}</td>
        <td>
          {candidate.jobPostedDate && !isNaN(Date.parse(candidate.jobPostedDate))
            ? new Date(candidate.jobPostedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </td>
        <td>{candidate.jobPostedBy}</td>
        <td>
          {candidate.appliedDate && !isNaN(Date.parse(candidate.appliedDate))
            ? new Date(candidate.appliedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </td>
        <td>{candidate.interviewedBy || "N/A"}</td>
      </tr>
    </>
  );
};

export default ReadOnlyRow;

