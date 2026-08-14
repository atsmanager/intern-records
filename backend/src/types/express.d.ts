import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string;
      userRole?: string;
      userCompany?: string;
    }
  }
}
