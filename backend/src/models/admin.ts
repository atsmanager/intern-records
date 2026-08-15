import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: 'superadmin' | 'moderator' | 'editor';
  company?: string;
  planId?: string;
  paymentDate?: Date;
  validityDate?: Date;
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['superadmin', 'editor'],
      default: 'editor'
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    planId: {
      type: String,
      default: null
    },
    paymentDate: {
      type: Date,
      default: null
    },
    validityDate: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IAdmin>('Admin', AdminSchema);