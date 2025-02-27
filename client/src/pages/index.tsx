import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import HotelList from "./home";
import BookingList from "./bookings";

const Main: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Home" />
          <Tab label="My Bookings" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 2 }}>
          {value === 0 && <HotelList />}
          {value === 1 && <BookingList />}
        </Box>
      </Box>
    </div>
  );
};

export default Main;
