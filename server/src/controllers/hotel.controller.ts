import { Request, Response } from "express";
import Hotel from "../models/hotel.model";
import Location from "../models/location.model";

export const getHotels = async (req: Request, res: Response) => {
  try {
    const { location } = req.query;
    //const hotels = await Hotel.find();

    const hotels = await Hotel.aggregate([
        {
          $lookup: {
            from: "locations", // Collection name in MongoDB
            localField: "location",
            foreignField: "_id",
            as: "locationDetails"
          }
        },
        {
          $unwind: "$locationDetails" // Convert array to object
        },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            rating: 1,
            locationName: "$locationDetails.name" // Rename the field
          }
        }
      ]);
    res.json(hotels);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getHotelsByLocation = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("req.param", req.params);
      const filter = id ? { location: Number(id) } : {};
      console.log("filter", filter);
      let hotels:any = await Hotel.find(filter);
      const locations:any = await Location.findOne({_id:id});
      
      
      res.json({hotels, locationName: locations.name} );
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };