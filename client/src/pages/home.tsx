import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationFilter from "../components/LocationFilter";
import HotelCard from "../components/HotelCard";
import hotelService from "../services/hotelService";

interface Hotel {
  _id: number;
  name: string;
  locationName: string;
  price?: number;
  rating?: number;
}


const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [location, setLocation] = useState("");


  const [selectedLocation, setSelectedLocation] = useState<number>(0);

  // Filter hotels by selected location
//  const filteredHotels = selectedLocation
//    ? hotels.filter((hotel) => hotel.location === selectedLocation)
//    : hotels;

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    fetchHotels(selectedLocation);
  }, [selectedLocation]);

  const fetchHotels = async (location:number = 0) => {
    try {
      
        if(location === 0) {
            const {data} = await  hotelService.getHotels();
            setHotels(data);
            setLocation(data);
        } else {
            const {data} = await  hotelService.getHotelsByLocation(location);
            console.log("data", data)
            setHotels(data.hotels);
            setLocation(data.locationName);
        }
      
      
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSearch = () => {
    fetchHotels(selectedLocation);
  };

  return (
    <div>
      <LocationFilter selectedLocation={selectedLocation} onChange={setSelectedLocation} />

     
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <HotelCard name= {hotel.name} _id={hotel._id} location={hotel.locationName || location} description={hotel.locationName} />
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      
    </div>
  );
};

export default HotelList;
