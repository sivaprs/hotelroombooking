import httpClient from "../helpers/httpClient";

interface Bookings {
  bookingId?: number;
  checkInDate: Date;
  checkOutDate: Date;
  hotelId: number;
  userId: string;
  rooms: number;
}

class BookingService {
  async createBooking(data: Bookings) {
    return httpClient.post(`api/v1/bookings`, data);
  }

  async updateBooking(data: Bookings) {
    return httpClient.put(`api/v1/bookings/${data?.bookingId}`, data);
  }

  async getBookings(id: string) {
    return httpClient.get(`api/v1/bookings/user/${id}`);
  }

  async getBookingsById(id: number) {
    return httpClient.get(`api/v1/bookings/${id}`);
  }
}

export default new BookingService();
