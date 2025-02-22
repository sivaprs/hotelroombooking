import React, {act, ReactElement, useState} from "react";
import dayjs, { Dayjs } from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import bookingService from "../services/bookingService";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  hotelId: number;
  action: string;
  bookingId?: number;
  checkInDate?: Date,
  checkOutDate?: Date,
  rooms?: number;
}

interface Bookings {
    bookingId?: number,
    checkInDate: Date,
    checkOutDate: Date,
    hotelId: number,
    userId: string,
    rooms: number
}

const Popup: React.FC<PopupProps> = ({ open, onClose, title, content, hotelId, action, bookingId, checkInDate,checkOutDate, rooms  }) => {
    const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs(checkInDate));
    const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs(checkOutDate));
    const [selectedRoom, setSelectedRoom] = useState<number>(rooms || 0);
    const onConfirm = async() => {
        console.log("checkin", checkIn?.format("DD/MM/YYYY"));
        console.log("checkOut", checkOut?.format("DD/MM/YYYY"));
        
        console.log("selectedRoom", selectedRoom);
        if(action === "create") {
            let obj:Bookings = {
                checkInDate: dayjs(checkIn).startOf("day").toDate() ?? new Date(),
                checkOutDate: dayjs(checkOut).startOf("day").toDate() ?? new Date(),
                hotelId: hotelId,
                userId: "demo",
                rooms: selectedRoom
            }
            try {
                const {data} = await bookingService.createBooking(obj);
                console.log("data response", data);
                onClose();
            } catch (e) {
                console.error(e);
            }
        } else {
            let obj:Bookings = {
                checkInDate: dayjs(checkIn).startOf("day").toDate() ?? new Date(),
                checkOutDate: dayjs(checkOut).startOf("day").toDate() ?? new Date(),
                hotelId: hotelId,
                bookingId: bookingId,
                userId: "demo",
                rooms: selectedRoom
            }
            try {
                const {data} = await bookingService.updateBooking(obj);
                console.log("data response", data);
                onClose();
            } catch (e) {
                console.error(e);
            }

        }
    };

    const handleChange:any = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedRoom(Number(event.target.value));
      };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}{hotelId}</DialogTitle>
      <DialogContent>
        <Typography>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DateRangePicker checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} />
            </LocalizationProvider>
            <FormControl className="">
            <InputLabel>Number of rooms</InputLabel>
            <Select value={selectedRoom} onChange={handleChange}>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
            </Select>
           </FormControl>
        </Typography>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">Confirm</Button>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;