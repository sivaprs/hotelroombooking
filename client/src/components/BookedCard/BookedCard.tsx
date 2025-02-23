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
import "../../assets/styles/common.css";
import ConfirmationModel from "../common/ConfirmationModel";
import bookingService from "../../services/bookingService";
import { Hotel, Bookings } from "./interface";
import { USER_ID, BOOKING_STATUS } from "../../constants";
import "./BookedCard.css";

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
      status: BOOKING_STATUS.CANCELED,
    };
    try {
      const { data } = await bookingService.updateBooking(obj);
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
      <Card className="hotel-card">
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box className="flex-30">
              <img
                src={`/assets/images/${props.name}.jpg`}
                width={"200"}
                height={"125"}
                alt="hotel"
              />
            </Box>
            <Box className="flex-70" display="flex">
              <Box justifyContent="flex-start" className="flex-60">
                <p className="heading">
                  {props.name}
                  <Rating value={props.rating} readOnly />
                </p>
                <p className="type">Delux Room</p>
                <ul className="description">
                  <li>Free Breakfast</li>
                  <li>Free Wifi</li>
                </ul>
              </Box>
              <Box justifyContent="flex-end" className="flex-40">
                <p>
                  <LocationOnIcon color="secondary" />
                  {props.location}
                </p>
                <p>
                  <span className="blueHighlight">
                    <b>Dates: </b>
                    {formatDate(props.checkInDate.toString())} to{" "}
                    {formatDate(props.checkOutDate.toString())}
                  </span>
                </p>
                <p>
                  <span className="orangeHighlight">
                    <b>Rooms: </b>
                    {props.rooms}
                  </span>
                </p>
                <p>
                  <span
                    className={
                      props.status == BOOKING_STATUS.CANCELED
                        ? "redHighlight"
                        : "greenHighlight"
                    }
                  >
                    {" "}
                    <b>Status: </b>
                    {props.status}
                  </span>
                </p>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            {props.status !== BOOKING_STATUS.CANCELED && (
              <Button
                variant="contained"
                onClick={() =>
                  setSelectedHotel({
                    title: props.name,
                    content: props.description,
                  })
                }
              >
                Edit Booking
              </Button>
            )}
            &nbsp;
            {props.status !== BOOKING_STATUS.CANCELED && (
              <Button
                variant="contained"
                color="warning"
                onClick={() => setCancel(true)}
              >
                Cancel Booking
              </Button>
            )}
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
