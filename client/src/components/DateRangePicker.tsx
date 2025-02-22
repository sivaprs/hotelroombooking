import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateRangePickerProps {
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
  setCheckIn: (date: Dayjs | null) => void;
  setCheckOut: (date: Dayjs | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ checkIn, checkOut, setCheckIn, setCheckOut }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Check-in Date Picker */}
        <DatePicker
          label="Check-in"
          value={checkIn}
          onChange={(newDate) => setCheckIn(newDate)}
         // renderInput={(params) => <TextField {...params} fullWidth />}
        />

        {/* Check-out Date Picker */}
        <DatePicker
          label="Check-out"
          value={checkOut}
          onChange={(newDate) => setCheckOut(newDate)}
         // minDate={checkIn} // Prevent selecting a check-out date before check-in
        //  renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
