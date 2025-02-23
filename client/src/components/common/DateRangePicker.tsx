import React from "react";
import { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../assets/styles/common.css";

interface DateRangePickerProps {
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
  setCheckIn: (date: Dayjs | null) => void;
  setCheckOut: (date: Dayjs | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <br />
      <Box className="datePicker">
        {/* Check-in Date Picker */}
        <DatePicker
          label="Check-in"
          value={checkIn}
          onChange={(newDate) => setCheckIn(newDate)}
        />

        {/* Check-out Date Picker */}
        <DatePicker
          label="Check-out"
          value={checkOut}
          onChange={(newDate) => setCheckOut(newDate)}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
