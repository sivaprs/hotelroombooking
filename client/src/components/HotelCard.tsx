import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Popup from "./Popup";

interface Hotel {
    _id: number,
    name: string,
    description: string,
    location: string
}

function HotelBox(props : Hotel) {
   const [selectedHotel, setSelectedHotel] = useState<{ title: string; content: string } | null>(null);

  return (
    <>
    <Card>
              <CardContent>
                <Typography variant="h6">{props.name}</Typography>
                <Typography variant="body2" color="text.secondary">{props.location}</Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }} 
                 
                  onClick={() => setSelectedHotel({ title: props.name, content: props.description })}

                >
                  Reserve
                </Button>
                &nbsp;
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }} 
                  //onClick={() => setSelectedHotel({ title: hotel.name, content: hotel.description })}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>

            {selectedHotel && (
        <Popup
          open={!!selectedHotel}
          onClose={() => setSelectedHotel(null)}
          title={selectedHotel.title}
          content={selectedHotel.content}
          hotelId={props._id}
          action="create"
          
        />
      )}
            </>
  );
}

export default HotelBox;