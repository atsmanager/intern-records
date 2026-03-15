import { type Candidate } from "../types/candidate";

interface ReadOnlyRowProps {
  candidate: Candidate;
  onDelete: (id: string) => void;
  onEdit: (candidate: Candidate) => void;
}
const ReadOnlyRow = ({ candidate, onDelete, onEdit }: ReadOnlyRowProps) => {
  return (
    <tr key={candidate._id} className="border-b hover:bg-gray-50 ">
      <td>
        <div className="flex gap-3 justify-center ">
          <button
            className="px-3 py-2 bg-green-600 rounded-lg hover:cursor-pointer hover:bg-green-500"
            onClick={() => onEdit(candidate)}
          >
            Edit
          </button>
          <button
            className="px-3 py-2 bg-red-500 rounded-lg hover:cursor-pointer hover:bg-red-400"
            onClick={() => onDelete(candidate._id)}
          >
            Delete
          </button>
        </div>
      </td>
      <td className="p-3">{candidate.name}</td>
      <td className="p-3">{candidate.phone}</td>
      <td className="p-3">{candidate?.status || "Pending..."}</td>
      <td className="p-3">{candidate?.comment || "Pending..."}</td>
      <td className="p-3">
        {candidate.joiningDate && !isNaN(Date.parse(candidate.joiningDate))
          ? new Date(candidate.joiningDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          : "N/A"}
      </td>
      {/* <td className="p-3">{`${
        candidate?.linkedInAge == undefined
          ? "pending..."
          : candidate.linkedInAge + "year"
      }`}</td> */}

      <td className="p-3">{candidate?.fieldType || "Pending..."}</td>
      <td className="p-3">{candidate.duration || "N/A"}</td>

      <td className="p-3">{candidate.email}</td>
      <td className="p-3">{candidate?.offerLetterSent || "Pending..."}</td>
      <td className="p-3">{candidate?.offerLetterAccepted || "Pending..."}</td>
      <td className="p-3">{candidate?.candidateEnrolled || "Pending..."}</td>



      <td className="p-3">{candidate?.linkedInProfile || "Pending..."}</td>

      <td className="p-3 text-blue-800">
        <a href={candidate.linkedinURL}>{candidate.linkedinURL || "Pending"}</a>
      </td>

      <td className="p-3">{candidate.jobBoard || "N/A"}</td>
      <td className="p-3">
        {candidate.jobPostedDate && !isNaN(Date.parse(candidate.jobPostedDate))
          ? new Date(candidate.jobPostedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          : "N/A"}
      </td>

      <td className="p-3">{candidate.jobPostedBy}</td>

      <td className="p-3">
        {candidate.appliedDate && !isNaN(Date.parse(candidate.appliedDate))
          ? new Date(candidate.appliedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          : "N/A"}
      </td>
      <td className="p-3">{candidate.company || "N/A"}</td>
      <td className="p-3">{candidate.jobTitle || "N/A"}</td>
      <td className="p-3">{candidate.interviewedBy || "N/A"}</td>
      {/* <td className="p-3">{candidate.interviewedBy}</td> */}
    </tr>
  );
};
export default ReadOnlyRow;
