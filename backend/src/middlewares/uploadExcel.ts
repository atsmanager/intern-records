import multer from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.memoryStorage();

const allowedExtensions = [".xlsx", ".xls", ".csv"];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    cb(new Error("Invalid file type. Only .xlsx, .xls, and .csv files are allowed."));
    return;
  }
  cb(null, true);
};

export const uploadExcel = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
});
