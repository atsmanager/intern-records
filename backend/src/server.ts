import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import cors from "cors";
import verifyToken from "./middlewares/authMiddleware";
import cookieParser from "cookie-parser";
import Admin from "./models/admin";
import { Request, Response } from "express";
import jwtRoute from "./routes/jwtRoutes";

dotenv.config();


const app = express();
app.use(cookieParser());
const allowedOrigins = [
  process.env.CLIENT_URL_2,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173"
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow dev origins
    }
  },
  credentials: true
}));

app.use(express.json());

import candidateRoute from "./routes/candidateRoute";
import adminRoute from "./routes/adminRoutes";
import stripeRoute from "./routes/stripeRoute";

app.use("/api/candidate", candidateRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", jwtRoute);
app.use("/api/stripe", stripeRoute);

const PORT = Number(process.env.PORT) || 5000;

app.get("/", (_req: Request, _res: Response) => {
  _res.send("Inter Records API is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
});
