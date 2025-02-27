import { Request, Response } from "express";
import Booking from "../models/booking.model";
import Hotel from "../models/hotel.model";
import Location from "../models/location.model";
import logger from "../utils/logger";

/** 
  Method to create new booking
**/

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    logger.info("Booked successfully");
    res.status(201).json(booking);
  } catch (error: any) {
    logger.error("Booking failed", error.message);
    res.status(500).json({ error: error.message });
  }
};

/** 
  Method to fetch booking details based on the booking id
**/

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
      status: bookings?.status,
      rating: hotel?.rating,
    };

    res.json(result);
  } catch (error: unknown) {
    logger.error(
      "Booking fetch failed",
      error instanceof Error ? error.message : error
    );
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

/** 
  Method to fetch all booking details based on the user id
**/

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });

    let result = await Promise.all(
      bookings.map(async (booking) => {
        const hotel = await Hotel.findOne({ _id: booking?.hotelId });
        const location = await Location.findOne({ _id: hotel?.location });
        return {
          bookingId: booking?.bookingId,
          hotelId: booking?.hotelId,
          checkInDate: booking?.checkInDate,
          checkOutDate: booking?.checkOutDate,
          rooms: booking?.rooms,
          roomsAvailable: hotel?.roomsAvailable,
          userId: booking?.userId,
          hotelName: hotel?.name,
          locationName: location?.name,
          status: booking?.status,
          rating: hotel?.rating,
        };
      })
    );

    res.json(result);
  } catch (error: unknown) {
    logger.error(
      "Booking fetch failed",
      error instanceof Error ? error.message : error
    );
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId: Number(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(updatedBooking);
  } catch (error: unknown) {
    logger.error(
      "Booking update failed",
      error instanceof Error ? error.message : error
    );
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    await Booking.findOneAndDelete({ bookingId: req.params.id }, req.body);
    res.json({ message: "Booking cancelled" });
  } catch (error: unknown) {
    logger.error(
      "Booking cancel failed",
      error instanceof Error ? error.message : error
    );
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
