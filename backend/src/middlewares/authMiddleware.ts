import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try cookie first, fall back to Authorization: Bearer <token> header
  const token =
    req.cookies.token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      (process.env.JWT_SECRET_KEY || process.env.JWT_SECRET)!
    ) as TokenPayload;

    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
