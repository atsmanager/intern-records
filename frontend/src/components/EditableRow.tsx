import { useState } from "react";
import { type CandidateFormData, type Candidate } from "../types/candidate";
import { candidateEditApi } from "../api/candidateApi";

interface EditableRowProp {
  candidat: Candidate;
  setEditCandidateId: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdate: (candidate: Candidate) => void;
}

const EditableRow = ({ candidat, setEditCandidateId, onUpdate }: EditableRowProp) => {
  const [editFormData, setEditFormData] = useState<CandidateFormData>({
    name: candidat.name,
    email: candidat.email,
    phone: candidat.phone,
    linkedInProfile: candidat.linkedInProfile ?? "",
    linkedInAge: candidat.linkedInAge ?? undefined,
    linkedinURL: candidat.linkedinURL ?? "",
    status: candidat.status ?? "",
    joiningDate: candidat.joiningDate ?? "",
    duration: candidat.duration ?? "",
    jobBoard: candidat.jobBoard,
    jobPostedDate: candidat.jobPostedDate,
    appliedDate: candidat.appliedDate,
    jobPostedBy: candidat.jobPostedBy,
    offerLetterSent: candidat.offerLetterSent ?? "",
    offerLetterAccepted: candidat.offerLetterAccepted ?? "",
    candidateEnrolled: candidat.candidateEnrolled ?? "",
    fieldType: candidat.fieldType ?? "",
    comment: candidat.comment ?? "",
    company: candidat.company ?? "",
    jobTitle: candidat.jobTitle ?? "",
    interviewedBy: candidat.interviewedBy ?? "",
  });

  const editHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name as keyof typeof prev]: value }));
  };

  const handleEditSave = async () => {
    try {
      const data = await candidateEditApi(candidat._id, editFormData);
      alert(data.message);
      onUpdate(data.updateCandidate);
      setEditCandidateId(null);
    } catch (error: any) {
      alert(error.response?.data?.error);
    }
  };

  const handleEditCancel = () => setEditCandidateId(null);

  return (
    <tr key={candidat._id} style={{ background: "rgba(155,89,247,0.05)" }}>
      <td>
        <div className="tbl-actions">
          <button className="btn-tbl-save" onClick={handleEditSave} type="button">
            Save
          </button>
          <button className="btn-tbl-cancel" onClick={handleEditCancel} type="button">
            Cancel
          </button>
        </div>
      </td>
      <td>
        <input type="text" value={editFormData.name} name="name" onChange={editHandleChange} />
      </td>
      <td>
        <input type="email" value={editFormData.email} name="email" onChange={editHandleChange} />
      </td>
      <td>
        <input type="tel" value={editFormData.phone} name="phone" onChange={editHandleChange} />
      </td>
      <td>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <select name="linkedInProfile" value={editFormData?.linkedInProfile || ""} onChange={editHandleChange}>
            <option value="">Has Profile?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={editFormData.linkedinURL}
            name="linkedinURL"
            onChange={editHandleChange}
          />
        </div>
      </td>
      <td>
        <select name="status" value={editFormData?.status || ""} onChange={editHandleChange}>
          <option value="">Select Status</option>
          <option value="interested">Interested</option>
          <option value="busy">Busy</option>
          <option value="no response">No Response</option>
          <option value="no incoming service">No Incoming Service</option>
          <option value="rejected">Rejected</option>
        </select>
      </td>
      <td>
        <textarea value={editFormData.comment} name="comment" onChange={editHandleChange} style={{ height: "60px", width: "120px" }} />
      </td>
      <td>
        <input type="date" value={editFormData?.joiningDate?.slice(0, 10)} name="joiningDate" onChange={editHandleChange} />
      </td>
      <td>
        <select name="duration" value={editFormData?.duration || ""} onChange={editHandleChange}>
          <option value="">Select</option>
          <option value="1 month">1 month</option>
          <option value="2 months">2 months</option>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
          <option value="5 months">5 months</option>
          <option value="6 months">6 months</option>
        </select>
      </td>
      <td>
        <select name="fieldType" value={editFormData?.fieldType || ""} onChange={editHandleChange}>
          <option value="">Select</option>
          <option value="Part Time">Part Time</option>
          <option value="Full Time">Full Time</option>
        </select>
      </td>
      <td>
        <select value={editFormData.offerLetterSent} name="offerLetterSent" onChange={editHandleChange}>
          <option value="" disabled>Select</option>
          <option value="yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td>
        <select name="offerLetterAccepted" value={editFormData.offerLetterAccepted} onChange={editHandleChange}>
          <option value="" disabled>Select</option>
          <option value="yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td>
        <select value={editFormData.candidateEnrolled} name="candidateEnrolled" onChange={editHandleChange}>
          <option value="" disabled>Select</option>
          <option value="yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td>
        <input type="text" value={editFormData.jobTitle} name="jobTitle" onChange={editHandleChange} />
      </td>
      <td>
        <input type="text" value={editFormData.company} name="company" onChange={editHandleChange} />
      </td>
      <td>
        <input type="text" value={editFormData.jobBoard} name="jobBoard" onChange={editHandleChange} />
      </td>
      <td>
        <input type="date" value={editFormData.jobPostedDate.slice(0, 10)} name="jobPostedDate" onChange={editHandleChange} />
      </td>
      <td>
        <input type="text" value={editFormData.jobPostedBy} name="jobPostedBy" onChange={editHandleChange} />
      </td>
      <td>
        <input type="date" value={editFormData.appliedDate.slice(0, 10)} name="appliedDate" onChange={editHandleChange} />
      </td>
      <td>
        <input type="text" value={editFormData.interviewedBy} name="interviewedBy" onChange={editHandleChange} />
      </td>
    </tr>
  );
};

export default EditableRow;
