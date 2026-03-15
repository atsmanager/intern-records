import { Request, Response } from "express";
import Candidate from "../models/candidate";
import { sendJoiningReminderEmailToHR } from "../utils/sendEmailToHR";
import { sendJoiningReminderEmailToCandidate } from "../utils/sendEmailToCandidate";
import XLSX from "xlsx";

// Add Candidate
export const addCandidateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      linkedInProfile,
      linkedInAge,
      linkedinURL,
      status,
      joiningDate,
      duration,
      jobBoard,
      jobPostedDate,
      appliedDate,
      jobPostedBy,
      offerLetterSent,
      offerLetterAccepted,
      candidateEnrolled,
      fieldType,
      comment,
      company,
      jobTitle,
      interviewedBy,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !jobBoard ||
      !jobPostedDate ||
      !appliedDate ||
      !jobPostedBy
    ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    //exist candidate
    const existCandidate = await Candidate.findOne({
      email
    });
    if (existCandidate) {
      res.status(400).json({ error: "Candidate already exists" });
      return;
    }

    const addCandidate = await Candidate.create({
      name,
      email,
      phone,
      linkedInProfile,
      linkedInAge,
      linkedinURL,
      status,
      joiningDate,
      duration,
      jobBoard,
      jobPostedDate,
      appliedDate,
      jobPostedBy,
      offerLetterSent,
      offerLetterAccepted,
      candidateEnrolled,
      fieldType,
      comment,
      company,
      jobTitle,
      interviewedBy,
    });

    res
      .status(201)
      .json({ message: "candidate added successfully", addCandidate });
  } catch (error) {
    if ((error as any).code === 11000) {
      const field = Object.keys((error as any).keyPattern)[0];
      const message =
        field === "email" ? "Email already exists" : "Phone number already exists";
      res.status(409).json({ error: message });
      return;
    }
    res.status(500).json({
      message: "candidate not added",
      error: (error as Error).message,
    });
  }
};

//Get Candidate
export const getCandidateController = async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 10);

  const search = req.query.search || "";
  const jobPostedFrom = req.query.jobPostedFrom;
  const jobPostedTo = req.query.jobPostedTo;

  let filter: any = {
    status: { $ne: "rejected" },
  };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobTitle: { $regex: search, $options: "i" } },
    ];
  }

  if (jobPostedFrom || jobPostedTo) {
    filter.jobPostedDate = {};

    if (jobPostedFrom) {
      filter.jobPostedDate.$gte = new Date(jobPostedFrom as string);
    }

    if (jobPostedTo) {
      filter.jobPostedDate.$lte = new Date(jobPostedTo as string);
    }
  }

  const skip = (page - 1) * limit;

  const candidate = await Candidate.find(filter).skip(skip).limit(limit);
  const total = await Candidate.countDocuments(filter);

  res.status(200).json({
    candidate,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const getRejectedCandidateController = async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 10);

  const search = req.query.search || "";
  const jobPostedFrom = req.query.jobPostedFrom;
  const jobPostedTo = req.query.jobPostedTo;

  let filter: any = {
    status: "rejected",
  };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobTitle: { $regex: search, $options: "i" } },
    ];
  }

  if (jobPostedFrom || jobPostedTo) {
    filter.jobPostedDate = {};

    if (jobPostedFrom) {
      filter.jobPostedDate.$gte = new Date(jobPostedFrom as string);
    }

    if (jobPostedTo) {
      filter.jobPostedDate.$lte = new Date(jobPostedTo as string);
    }
  }

  const skip = (page - 1) * limit;

  const candidate = await Candidate.find(filter).skip(skip).limit(limit);
  const total = await Candidate.countDocuments(filter);

  res.status(200).json({
    candidate,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

//Delete Candidate
export const deleteCandidateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleteCandidate = await Candidate.findByIdAndDelete(id);

    if (!deleteCandidate) {
      res.status(404).json({ message: "Candidate not found" });
      return;
    }

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: (error as Error).message,
    });
  }
};

//update Candidate
export const updateCandidateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      linkedInProfile,
      linkedInAge,
      linkedinURL,
      status,
      joiningDate,
      duration,
      jobBoard,
      jobPostedDate,
      appliedDate,
      jobPostedBy,
      offerLetterSent,
      offerLetterAccepted,
      candidateEnrolled,
      fieldType,
      comment,
      company,
      jobTitle,
      interviewedBy,
    } = req.body;

    const candidate = {
      name,
      email,
      phone,
      linkedInProfile,
      linkedInAge,
      linkedinURL,
      status,
      joiningDate,
      duration,
      jobBoard,
      jobPostedDate,
      appliedDate,
      jobPostedBy,
      offerLetterSent,
      offerLetterAccepted,
      candidateEnrolled,
      fieldType,
      comment,
      company,
      jobTitle,
      interviewedBy,
    };

    const updateCandidate = await Candidate.findByIdAndUpdate(id, candidate, {
      new: true,
      runValidators: true,
    });
    if (!updateCandidate) {
      res.status(404).json({ message: "Candidate not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Candidate update successfully", updateCandidate });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: (error as Error).message,
    });
  }
};

//Joining Reminder
export const checkJoiningReminderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const candidates = await Candidate.find({
      status: "interested",
      joiningDate: {
        $gte: tomorrow,
        $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (candidates.length > 0) {
      await Promise.all(
        candidates.flatMap((candidate) => [
          sendJoiningReminderEmailToHR(candidate),
          sendJoiningReminderEmailToCandidate(candidate),
        ])
      );
    }

    res.status(200).json({
      message: "Joining reminder check completed",
      total: candidates.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while checking joining reminders",
      error: (error as Error).message,
    });
  }
};

// Upload Excel
export const uploadExcelController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Excel read
    const workBook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workBook.SheetNames[0];
    const sheet = workBook.Sheets[sheetName];

    // Convert to JSON, default value blank
    const data: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    let saved = 0;
    let skipped = 0;

    // Helper to clean phone, but don't truncate
    const normalizePhone = (value: any): string => {
      if (!value) return "";
      let phone = String(value).trim();

      // Scientific notation handle
      if (/e/i.test(phone)) {
        phone = Number(phone).toString();
      }

      // Remove non-digit characters
      phone = phone.replace(/\D/g, "");
      return phone;
    };

    // Helper to parse date safely
    const parseDate = (value: any) => {
      if (!value) return undefined;
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    };

    for (const row of data) {
      const name = row["name"] || row["Name"];
      const email = row["email"] || row["Email"];
      const phone = normalizePhone(row["phone"] || row["Phone"]);

      // Skip only if all three are empty
      if (!name && !email && !phone) {
        skipped++;
        continue;
      }

      // Duplicate check on email OR phone
      const exist = await Candidate.findOne({
        $or: [{ email: email?.toLowerCase() }, { phone: phone }],
      });

      if (exist) {
        skipped++;
        continue;
      }

      // Status: if not in enum, save as blank
      const allowedStatus = [
        "",
        "busy",
        "interested",
        "no response",
        "no incoming service",
        "rejected",
      ];
      let statusRaw = row["status"] || row["Status"] || "";
      const status = allowedStatus.includes(statusRaw.trim())
        ? statusRaw.trim()
        : "";

      const parseJoiningDate = (value: any) => {
        if (!value) return undefined;

        const date = new Date(value);
        if (!isNaN(date.getTime())) return date;
        return undefined;
      };

      // Create candidate
      await Candidate.create({
        name: name?.trim() || "",
        email: email?.toLowerCase().trim() || "",
        phone: phone || "",
        status,
        joiningDate: parseJoiningDate(row["joiningDate"]),
        duration: row["duration"] || row["Duration"] || "",
        jobBoard: "",
        jobPostedDate: new Date(),
        appliedDate:
          parseDate(row["appliedDate"] || row["Date Applied"]) || new Date(),
        jobPostedBy: row["Interviewer"] || "",
        offerLetterSent: row["Offer letter Send"] || "",
        offerLetterAccepted: row["Accepted Offer Letter"] || "",
        candidateEnrolled: row["Candidates Enrolled"] || "",
      });

      saved++;
    }

    res.status(200).json({
      message: "Excel upload completed",
      saved,
      skipped,
      total: data.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Excel upload failed",
      error: (error as Error).message,
    });
  }
};

export const LoginCandidate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Missing email or password");
    }
    const user = await Candidate.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
}


