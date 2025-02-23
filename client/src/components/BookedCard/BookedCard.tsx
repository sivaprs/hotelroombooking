import React, { useState } from "react";
import {
  Snackbar,
  Card,
  CardContent,
  Button,
  Box,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Popup from "../BookingPopup/BookingPopup";
import hotel1 from "../../assets/images/hotel1.jpg";
import "../../assets/styles/common.css";
import ConfirmationModel from "../common/ConfirmationModel";
import bookingService from "../../services/bookingService";
import { Hotel, Bookings } from "./interface";
import { USER_ID } from "../../constants";

const formatDate = (dateString: string): string => {
  return dateString?.split("T")[0];
};

function BookedCard(props: Hotel) {
  const [selectedHotel, setSelectedHotel] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [cancel, setCancel] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const onCancel = async () => {
    let obj: Bookings = {
      checkInDate: props.checkInDate ?? new Date(),
      checkOutDate: props.checkOutDate ?? new Date(),
      hotelId: props.hotelId,
      bookingId: props.bookingid,
      userId: USER_ID,
      rooms: props.rooms || 0,
      status: "CANCELED",
    };
    try {
      const { data } = await bookingService.updateBooking(obj);
      console.log("data response", data);
      setOpen(true);
      setCancel(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message="Booking cancelled successfully"
      />
      <Card sx={{ height: 245, marginTop: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box flex="0 0 30%">
              <img src={hotel1} width={"200"} height={"125"} alt="hotel" />
            </Box>
            <Box flex="0 0 70%" display="flex">
              <Box justifyContent="flex-start" flex="0 0 60%">
                <p className="heading">
                  {props.name}
                  <Rating value={4} readOnly />
                </p>
                <p className="type">Delux Room</p>
                <ul className="description">
                  <li>Free Breakfast</li>
                  <li>Free Wifi</li>
                </ul>
              </Box>
              <Box justifyContent="flex-end" flex="0 0 40%">
                <p>
                  <LocationOnIcon color="secondary" />
                  {props.location}
                </p>
                <span className="blueHighlight">
                  Dates:{" "}
                  <b>
                    {formatDate(props.checkInDate.toString())} to{" "}
                    {formatDate(props.checkOutDate.toString())}
                  </b>
                </span>
                <span className="orangeHighlight">
                  Number of Rooms: <b>4</b>
                </span>
                <span className="greenHighlight">
                  Status: <b>BOOKED</b>
                </span>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() =>
                setSelectedHotel({
                  title: props.name,
                  content: props.description,
                })
              }
            >
              Edit Booking
            </Button>
            &nbsp;
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              color="warning"
              onClick={() => setCancel(true)}
            >
              Cancel Booking
            </Button>
          </Box>
        </CardContent>
      </Card>

      {selectedHotel && (
        <Popup
          open={!!selectedHotel}
          onClose={() => setSelectedHotel(null)}
          title={selectedHotel.title}
          content={selectedHotel.content}
          hotelId={props.hotelId}
          action="edit"
          checkInDate={props.checkInDate}
          checkOutDate={props.checkOutDate}
          bookingId={props.bookingid}
          rooms={props.rooms}
          location={props.location}
        />
      )}
      {cancel && (
        <ConfirmationModel
          open={!!cancel}
          onClose={() => setCancel(false)}
          message="Do you need to cancel the booking ?"
          onConfirm={() => onCancel()}
        />
      )}
    </>
  );
}

export default BookedCard;
