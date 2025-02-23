import React, { useState, useEffect, useCallback } from "react";
import LocationFilter from "../components/LocationFilter/LocationFilter";
import HotelCard from "../components/HotelCard/HotelCard";
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

  useEffect(() => {
    fetchHotels(selectedLocation);
  }, [selectedLocation]);

  const fetchHotels = useCallback(async (location: number = 0) => {
    try {
      if (location === 0) {
        const { data } = await hotelService.getHotels();
        setHotels(data);
        setLocation(data);
      } else {
        const { data } = await hotelService.getHotelsByLocation(location);
        console.log("data", data);
        setHotels(data.hotels);
        setLocation(data.locationName);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }, []);

  return (
    <div>
      <LocationFilter
        selectedLocation={selectedLocation}
        onChange={setSelectedLocation}
      />

      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <HotelCard
            name={hotel.name}
            id={hotel._id}
            location={hotel.locationName || location}
            description={hotel.locationName}
            rating={Number(hotel.rating)}
            price={Number(hotel.price)}
          />
        ))
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
};

export default HotelList;
