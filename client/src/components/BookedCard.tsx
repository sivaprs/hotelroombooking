import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Popup from "./Popup";

interface Hotel {
    hotelId: number,
    bookingid: number,
    checkInDate: Date,
    checkOutDate: Date,
    name: string,
    description: string,
    location: string,
    rooms: number,
}

function BookedCard(props : Hotel) {
   const [selectedHotel, setSelectedHotel] = useState<{ title: string; content: string } | null>(null);

  return (
    <>
    <Card>
              <CardContent>
                <Typography variant="h6">{props.checkInDate.toString()}</Typography>
                <Typography variant="body2" color="text.secondary">{props.location}</Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }} 
                 
                  onClick={() => setSelectedHotel({ title: props.name, content: props.description })}

                >
                  Edit Booking
                </Button>
                &nbsp;
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }} 
                  //onClick={() => setSelectedHotel({ title: hotel.name, content: hotel.description })}
                >
                 Cancel Booking
                </Button>
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
        />
      )}
            </>
  );
}

export default BookedCard;