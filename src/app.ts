import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config";

import authRoutes from "./routes/authRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import childenRoutes from "./routes/childRoutes";
import complaintsRoutes from "./routes/complaintsRoutes";
import doctorsRoutes from "./routes/doctorRoutes";
import clinicsRoutes from "./routes/clinicRoutes";

import path from "path";
import { notFound } from "./controllers/notFoundController";

const app = express();

// Middleware
app.use("/api/images", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(morgan("combined"));

// Authentication routes
app.use("/api/auth", authRoutes);

// Routes
app.use("/api/appointements", appointmentRoutes);
app.use("/api/children", childenRoutes);
app.use("/api/complaints", complaintsRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/clinics", clinicsRoutes);

// Error Handling
app.use(errorHandler);

app.all("*", notFound);

export default app;
