import mongoose from "mongoose";

interface IHotel {
  _id: number;  
  name: string;
  location: number;
  roomsAvailable: number;
}

const hotelSchema = new mongoose.Schema<IHotel>({
  _id:  { type: Number, required: true },
  name: { type: String, required: true },
  location: { type: Number, ref: "Location", required: true },
  roomsAvailable: { type: Number, required: true },
});

const Hotel = mongoose.model<IHotel>("Hotels", hotelSchema);
export default Hotel;