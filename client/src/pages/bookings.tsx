import React, { useState, useEffect } from "react";
import bookingService from "../services/bookingService";
import BookedCard from "../components/BookedCard";

function BookingList() {
  const [hotels, setHotels] = useState([]);
  const [booked, setBooked] = useState({});

  const getBookings = async() => {
    try {
      const {data} = await bookingService.getBookings("demo");
      setHotels(data);
      console.log("dta", data);
    } catch (e) {
      console.log("error", e);
    }
    
  }
  const getBookingsById = async(id: number) => {
    try {
      const {data} = await bookingService.getBookingsById(id);
      setBooked(data);
      console.log("dta", data);
    } catch (e) {
      console.log("error", e);
    }
    
  }
  useEffect(() => {
     getBookings();
     //getBookingsById(2);
          
  }, []) 

  return (
    <div>
      
       {hotels.length > 0 && hotels.map((hotel:any) => (
         
         <BookedCard hotelId={hotel.hotelId}
         bookingid={hotel.bookingId}
         checkInDate={hotel.checkInDate}
         checkOutDate={hotel.checkOutDate}
         name={hotel.hotelName}
         description={hotel.locationName}
         location={hotel.locationName}
         rooms={hotel.rooms}/>
        ))
      }
    </div>
  );
}

export default BookingList;