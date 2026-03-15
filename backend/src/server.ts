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
app.use(cors({
  origin: process.env.CLIENT_URL_2,
  credentials: true
}));

app.use(express.json());

import candidateRoute from "./routes/candidateRoute";
import adminRoute from "./routes/adminRoutes"



app.use("/api/candidate",candidateRoute);
app.use("/api/admin",adminRoute)
app.use("/api/auth",jwtRoute)

const PORT = Number(process.env.PORT);



app.get("/", (_req: Request, _res: Response) => {
  _res.send("Inter Records API is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at 
         http://localhost:${PORT}`);
  });
});
