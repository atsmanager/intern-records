import multer from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".xlsx" && ext !== ".xls") {
    cb(new Error("Only Excel files allowed"));
    return;
  }
  cb(null, true);
};

export const uploadExcel = multer({
  storage,
  fileFilter,
});
