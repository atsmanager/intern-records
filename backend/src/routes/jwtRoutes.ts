
import { Request, Response, Router } from "express";
import Admin from "../models/admin";
import verifyToken from '../middlewares/authMiddleware';

interface MeResponse {
  user: {
    id: string;
    role: string;
    name: string;
  };
}


const router = Router();


router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const user = await Admin.findById(req.user).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      user: user.username,
    }
  });
});

export default router;
