import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import hotelRoutes from "./routes/hotel.routes";
import bookingRoutes from "./routes/booking.routes";
import locationsRoutes from "./routes/location.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/locations", locationsRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

export default app;
