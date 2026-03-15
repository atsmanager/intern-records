import { model, Schema, Types } from "mongoose";

type CandidateStatus =
  | ""
  | "busy"
  | "interested"
  | "no response"
  | "no incoming service"
  | "rejected";

type CandidateFieldType = "" | "Part time" | "Full time";

interface ICandidate {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  linkedInProfile?: string;
  linkedInAge?: number;
  linkedinURL?: string;
  status?: CandidateStatus;
  joiningDate?: Date;
  duration?: string;
  jobBoard: string;
  jobPostedDate: Date;
  appliedDate: Date;
  jobPostedBy: string;
  offerLetterSent?: string;
  offerLetterAccepted?: string;
  candidateEnrolled?: string;
  fieldType?: CandidateFieldType;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: string;
  jobTitle?: string;
  interviewedBy?: string;
}

const candidateSchema = new Schema<ICandidate>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    linkedInProfile: {
      type: String,
    },
    linkedInAge: {
      type: Number,
    },
    linkedinURL: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "",
        "busy",
        "interested",
        "no response",
        "no incoming service",
        "rejected",
      ],
    },
    joiningDate: {
      type: Date,
    },
    duration: {
      type: String,
    },
    jobBoard: {
      type: String,
    },
    jobPostedDate: {
      type: Date,
    },
    appliedDate: {
      type: Date,
    },
    jobPostedBy: {
      type: String,
    },
    offerLetterSent: {
      type: String,
    },
    offerLetterAccepted: {
      type: String,
    },
    candidateEnrolled: {
      type: String,
    },
    fieldType: {
      type: String,
      enum: ["", "Part Time", "Full Time"],
    },
    comment: {
      type: String,
    },
    company: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    interviewedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Candidate = model<ICandidate>("Candidate", candidateSchema);

export default Candidate;
