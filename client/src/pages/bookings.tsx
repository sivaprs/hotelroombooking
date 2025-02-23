import React, { useState, useEffect, useCallback } from "react";
import bookingService from "../services/bookingService";
import BookedCard from "../components/BookedCard/BookedCard";
import { USER_ID } from "../constants";

function BookingList() {
  const [booked, setBooked] = useState([]);

  const getBookings = useCallback(async () => {
    try {
      const { data } = await bookingService.getBookings(USER_ID);
      setBooked(data);
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      {booked.length > 0 &&
        booked.map((hotel: any) => (
          <BookedCard
            hotelId={hotel.hotelId}
            bookingid={hotel.bookingId}
            checkInDate={hotel.checkInDate}
            checkOutDate={hotel.checkOutDate}
            name={hotel.hotelName}
            description={hotel.locationName}
            location={hotel.locationName}
            rooms={hotel.rooms}
            status={hotel.status}
            rating={hotel.rating}
          />
        ))}
    </div>
  );
}

export default BookingList;
