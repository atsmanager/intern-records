import { type Candidate } from "../types/candidate";

interface ReadOnlyRowProps {
  candidate: Candidate;
  onDelete: (id: string) => void;
  onEdit: (candidate: Candidate) => void;
}

const ReadOnlyRow = ({ candidate, onDelete, onEdit }: ReadOnlyRowProps) => {
  return (
    <tr key={candidate._id}>
      <td>
        <div className="tbl-actions">
          <button className="btn-tbl-edit" onClick={() => onEdit(candidate)} title="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button className="btn-tbl-delete" onClick={() => onDelete(candidate._id)} title="Delete">
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
  );
};

export default ReadOnlyRow;
