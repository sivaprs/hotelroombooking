export interface Hotel {
  hotelId: number;
  bookingid: number;
  checkInDate: Date;
  checkOutDate: Date;
  name: string;
  description: string;
  location: string;
  rooms: number;
}

export interface Bookings {
  bookingId?: number;
  checkInDate: Date;
  checkOutDate: Date;
  hotelId: number;
  userId: string;
  rooms: number;
  status: string;
}
