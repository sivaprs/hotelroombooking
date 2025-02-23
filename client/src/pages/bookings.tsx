import React, { useState, useEffect } from "react";
import bookingService from "../services/bookingService";
import BookedCard from "../components/BookedCard";

function BookingList() {
  const [booked, setBooked] = useState([]);

  const getBookings = async () => {
    try {
      const { data } = await bookingService.getBookings("demo");
      setBooked(data);
    } catch (e) {
      console.log("error", e);
    }
  };

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
          />
        ))}
    </div>
  );
}

export default BookingList;
