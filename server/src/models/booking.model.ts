import mongoose from "mongoose";
import Counters from "../models/counters.model";

interface IBooking {
  bookingId: number; 
  userId: string;
  hotelId: string;
  checkInDate: Date;
  checkOutDate: Date;
  rooms: number;
  status: string;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  bookingId: { type: Number, unique: true },  
  userId: { type: String, required: true },
  hotelId: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  rooms: { type: Number, required: true },
  status: { type: String, required: true },
});

bookingSchema.pre("save", async function (next) {
    if (!this.isNew) return next(); // Only generate for new documents
  
    const counter = await Counters.findOneAndUpdate(
      { _id: "booking_id" },
      { $inc: { seq: 1 } }, // Increment sequence
      { new: true, upsert: true }
    );
  
    this.bookingId = counter.seq;
    next();
  });

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;