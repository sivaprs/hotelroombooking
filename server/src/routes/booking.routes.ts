import express from "express";
import { createBooking, getBookings, updateBooking, cancelBooking, getUserBookings } from "../controllers/booking.controller";

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", getBookings);
router.get("/user/:userId", getUserBookings);
router.put("/:id", updateBooking);
router.delete("/:id", cancelBooking);

export default router;