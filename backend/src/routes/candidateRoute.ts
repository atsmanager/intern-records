import express from "express";
import {
  addCandidateController,
  deleteCandidateController,
  getCandidateController,
  updateCandidateController,
  checkJoiningReminderController,
  uploadExcelController,
  getRejectedCandidateController,
} from "../controllers/candidateController";
import { uploadExcel } from "../middlewares/uploadExcel";
import verifyToken from "../middlewares/authMiddleware";

const router = express.Router();

router.use(verifyToken);
router.post("/add", addCandidateController);
router.get("/", getCandidateController);
router.delete("/:id", deleteCandidateController);
router.put("/:id", updateCandidateController);
router.get("/check-joining-reminders", checkJoiningReminderController);
router.get("/rejected",getRejectedCandidateController);

router.post("/upload-excel", uploadExcel.single("file"), uploadExcelController);

export default router;
