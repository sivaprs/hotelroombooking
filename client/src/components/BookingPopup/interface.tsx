export interface BookingPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  hotelId: number;
  action: string;
  bookingId?: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  rooms?: number;
  location: string;
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
