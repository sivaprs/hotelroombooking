import React,{useEffect, useState} from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LocationService from "../services/locationService";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface LocationFilterProps {
  selectedLocation: number;
  onChange: (location: number) => void;
}

interface Location {
    _id: number;
    name: string;
  }


const LocationFilter: React.FC<LocationFilterProps> = ({ selectedLocation, onChange }) => {

   const [locations, setLocations] = useState<Array<Location>>([]);  

   const getLocations = async() => {
    try {
        const {data} = await LocationService.getLocations();
        setLocations(data);
     } catch (error) {
         console.error(error)
     }
   };

  useEffect(()=>{
    
    getLocations();

  },[])

  return (
    <FormControl fullWidth>
      <InputLabel>Location</InputLabel>
      <Select
        value={selectedLocation}
        onChange={(event) => onChange(Number(event.target.value))}
      >
          
        {locations.length > 0 &&  locations.map((location) => (
          <MenuItem key={location._id} value={location._id}>
           <LocationOnIcon color="secondary" /> {location.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationFilter;