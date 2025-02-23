import React, { useState } from "react";
import { Box, Card, CardContent, Button, Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Popup from "../BookingPopup/BookingPopup";
import hotel1 from "../../assets/images/hotel1.jpg";
//import hotel2 from "../assets/images/hotel2.jpg"
//import hotel3 from "../assets/images/hotel3.jpg"
import "../../assets/styles/common.css";
import { Hotel } from "./interface";
import { BOOKING_ACTION, CURRENCY } from "../../constants";
import "./HotelCard.css";

function HotelBox(props: Hotel) {
  const [selectedHotel, setSelectedHotel] = useState<{
    title: string;
    content: string;
  } | null>(null);

  return (
    <>
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
              <Box justifyContent="flex-start" className="flex-70">
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
              <Box justifyContent="flex-end" className="flex-30">
                <p>
                  <LocationOnIcon color="secondary" />
                  {props.location}
                </p>
                <p className="rate">
                  <b>
                    {CURRENCY} {props.price} per Night
                  </b>
                </p>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() =>
                setSelectedHotel({
                  title: props.name,
                  content: props.description,
                })
              }
            >
              Reserve
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
          hotelId={props.id}
          location={props.location}
          action={BOOKING_ACTION.CREATE}
        />
      )}
    </>
  );
}

export default HotelBox;
