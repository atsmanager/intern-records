import mongoose from "mongoose";

interface PasswordResetOTP {
    email: string;
    otpHash: string;
    expiresAt: Date;
    attempts:number
}

const passwordResetOTPSchema = new mongoose.Schema<PasswordResetOTP>({
  email: {
    type: String,
    required: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 5*60*1000),
    required: true,
  },
  attempts: {
    type: Number,
    default:0,
    required: true,
  },
});
passwordResetOTPSchema.index(
    { expiresAt:1 },
    {expireAfterSeconds:0},
)

const PasswordResetOTP =  mongoose.model<PasswordResetOTP> ('PasswordResetOTP',passwordResetOTPSchema);

export default PasswordResetOTP