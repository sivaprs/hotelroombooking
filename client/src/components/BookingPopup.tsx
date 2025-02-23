import React, {useState} from "react";
import dayjs, { Dayjs } from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import bookingService from "../services/bookingService";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface BookingPopupProps {
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
  location: string;
}

interface Bookings {
    bookingId?: number,
    checkInDate: Date,
    checkOutDate: Date,
    hotelId: number,
    userId: string,
    rooms: number,
    status: string
}

const BookingPopup: React.FC<BookingPopupProps> = ({ open, onClose, title, hotelId, action, bookingId, checkInDate,checkOutDate, rooms, location  }) => {
    const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs(checkInDate));
    const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs(checkOutDate));
    const [selectedRoom, setSelectedRoom] = useState<number>(rooms || 0);
    const [opens, setOpens] = useState(false);
    const handleClose = () => {
             setOpens(false);
       };
    const onConfirm = async() => {

        if(action === "create") {
            let obj:Bookings = {
                checkInDate: dayjs(checkIn).startOf("day").toDate() ?? new Date(),
                checkOutDate: dayjs(checkOut).startOf("day").toDate() ?? new Date(),
                hotelId: hotelId,
                userId: "demo",
                rooms: selectedRoom,
                status: "BOOKED"
            }
            try {
                await bookingService.createBooking(obj);
                setOpens(true);
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
                rooms: selectedRoom,
                status: "BOOKED"
            };
            try {
                const {data} = await bookingService.updateBooking(obj);
                console.log("data response", data);
                //onClose();
                setOpens(true);
            } catch (e) {
                console.error(e);
            }

        }
    };

    const handleChange:any = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedRoom(Number(event.target.value));
      };


  return (
    <>
    <Snackbar
            open={opens}
            autoHideDuration={10000}
            onClose={handleClose}
            message={action === "create" ? "Booking created successfully": "Booking updated successfully"}
          />
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}  <LocationOnIcon color="secondary"/>{location}</DialogTitle>
      <DialogContent>
        <DateRangePicker checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} />
            <br/>
            <FormControl sx={{ width: "40%" }}>
            <InputLabel>Number of rooms</InputLabel>
            <Select value={selectedRoom} onChange={handleChange}>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
            </Select>
           </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" variant="contained">{action === "create"? "Confirm Booking" : "Update Booking"}</Button>
        <Button onClick={onClose} color="success" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default BookingPopup;