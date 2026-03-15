import { Request, Response } from "express";
import Admin from "../models/admin";
import Candidate from "../models/candidate";
import PasswordResetOTP from "../models/passwordResetOTP";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    role: string;
    name: string;
  };
}

export const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    console.log(e);
  }
}

export const LoginValidationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Missing email or password");
      throw new Error("Missing email or password");
    }

    const person = await Admin.findOne({ email });
    let role = "editor";

    if (person && person.role === "superadmin") {
      role = "superadmin";
    }

    if (person) {
      const token = jwt.sign({ id: person._id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const data: LoginResponse = {
        token: token,
        user: {
          id: `${person._id}`,
          role: role,
          name: person.username,
        },
      };

      return res.status(200).json(data);
    }

    res.status(404).json({ message: "user not found" });
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const admin = new Admin({ username, email, passwordHash: password });
    await admin.save();
    res.status(200).json({ message: "user created successfully" });
  } catch (e) {
    console.log(e);
  }
};

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", otpSent: false });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "No user found", otpSent: false });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDERMAIL,
        pass: process.env.MAILPASSWORD,
      },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHashy = await bcryptjs.hash(otp, 10);

    await transporter.sendMail({
      from: process.env.SENDERMAIL,
      to: email,
      subject: "Regarding reset password request",
      text: `Dear user,\nYour OTP is ${otp}. It is valid for 5 minutes.`,
    });

    await PasswordResetOTP.findOneAndUpdate(
      { email },
      {
        email,
        otpHash: otpHashy,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        attempts: 0,
      },
      { upsert: true },
    );

    return res
      .status(200)
      .json({ message: "Otp sent successfully", otpSent: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Internal server error", otpSent: false });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp: enteredOTP } = req.body;

    if (!email || !enteredOTP) {
      return res
        .status(400)
        .json({ message: "Invalid request", verified: false });
    }

    const otpDoc = await PasswordResetOTP.findOne({ email });
    if (!otpDoc) {
      return res.status(400).json({ message: "Invalid OTP", verified: false });
    }

    if (otpDoc.expiresAt < new Date()) {
      await PasswordResetOTP.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired", verified: false });
    }

    if (otpDoc.attempts >= 5) {
      await PasswordResetOTP.deleteOne({ email });
      return res
        .status(400)
        .json({ message: "Too many attempts", verified: false });
    }

    const isValid = await bcryptjs.compare(enteredOTP, otpDoc.otpHash);

    if (!isValid) {
      await PasswordResetOTP.updateOne({ email }, { $inc: { attempts: 1 } });
      return res.status(400).json({ message: "Invalid OTP", verified: false });
    }

    await PasswordResetOTP.deleteOne({ email });

    return res.status(200).json({ message: "OTP verified", verified: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Internal server error", verified: false });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const passwordHash = await bcryptjs.hash(password, 10);
    const update = await Admin.findOneAndUpdate(
      { email },
      { passwordHash },
      { new: true }
    );
    if (!update) {
      console.log("Error in db while updating password");
      return res.status(400).json({ message: "Enter a valid email in the email field" });
    }
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    console.log("Error while updating password");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkRole = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(200).json({ role: user.role });
    }
    res.status(404).json({ message: "user not found" });
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userData = await Admin.find({ role: "editor" });
    const users = userData.map((user) => {
      return {
        id: user._id,
        name: user.username,
        email: user.email,
      };
    });

    res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.id;
    const user = await Admin.findOneAndDelete({ email });

    if (user) {
      return res.status(200).json({ message: "User successfully deleted" });
    }

    res.status(404).json({ message: "user not found" });
  } catch (e) {
    console.log(e);
  }
};

export const checkMail = async (req: Request, res: Response) => {
  try {
    const email = (req.query.email as string | undefined)?.trim();
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const candidate = await Candidate.findOne({ email: email.toLowerCase() });
    if (candidate) {
      return res.status(200).json({ message: "Email already exists" });
    }
    return res.status(200).json({ message: "Email available" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
