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
          <button className="btn-tbl-edit" onClick={() => onEdit(candidate)}>
            Edit
          </button>
          <button className="btn-tbl-delete" onClick={() => onDelete(candidate._id)}>
            Delete
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
