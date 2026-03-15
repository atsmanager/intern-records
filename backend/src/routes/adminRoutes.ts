
import {
    passwordReset,
    LoginValidationController,
    createUser,
    verifyOTP,
    updatePassword,
    checkRole,
    getUsers,
    removeUser,
    checkMail,
    logoutController
} from "../controllers/adminController";
import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", LoginValidationController);

router.post('/reset-password', passwordReset)
router.post("/verify-otp", verifyOTP)
router.post("/update-password", updatePassword);
router.get("/check-role", checkRole);

router.use(verifyToken);
router.post("/createuser", createUser);
router.get("/get-users", getUsers);
router.delete("/remove-user/:id", removeUser);
router.get("/check-mail", checkMail);
router.get("/logout", logoutController);

export default router;