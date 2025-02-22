import { Request, Response } from "express";
import Booking from "../models/booking.model";
import Hotel from "../models/hotel.model";
import Location from "../models/location.model";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findOne({ bookingId: req.params.id });
    const hotel = await Hotel.findOne({ _id: bookings?.hotelId });
    const location = await Location.findOne({ _id: hotel?.location });
    const result = {
        bookingId: bookings?.bookingId,
        hotelId: bookings?.hotelId,
        checkInDate: bookings?.checkInDate,
        checkOutDate: bookings?.checkOutDate,
        rooms: bookings?.rooms,
        roomsAvailable: hotel?.roomsAvailable,
        userId: bookings?.userId,
        hotelName: hotel?.name,
        locationName: location?.name,
    }
    console.log("result", result)

    res.json(result);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
    try {
      const bookings = await Booking.find({ userId: req.params.userId });
      res.json(bookings);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate({bookingId: Number(req.params.id)}, req.body, { new: true });
    res.json(updatedBooking);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    await Booking.findOneAndUpdate({bookingId:req.params.id}, req.body, { new: true } );
    res.json({ message: "Booking cancelled" });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
