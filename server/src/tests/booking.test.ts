import request from "supertest";
import app from "../app";

describe("Booking API Tests", () => {
  it("Create Booking", async () => {
    const payLoad = {
      checkInDate: "2025-02-22T18:30:00.000Z",
      checkOutDate: "2025-02-22T18:30:00.000Z",
      hotelId: 2,
      userId: "demo",
      rooms: 4,
      status: "BOOKED",
    };
    const response = await request(app).post(`/api/v1/bookings`).send(payLoad);
    expect(response.status).toBe(201);
    expect(response.body.bookingId).toBeGreaterThan(0);
  });

  it("Update Booking", async () => {
    const payLoad = {
      checkInDate: "2025-02-23T18:30:00.000Z",
      checkOutDate: "2025-02-24T18:30:00.000Z",
      hotelId: "3",
      bookingId: 1,
      userId: "demo",
      rooms: 4,
      status: "BOOKED",
    };
    const response = await request(app)
      .put(`/api/v1/bookings/${payLoad.bookingId}`)
      .send(payLoad);
    expect(response.status).toBe(200);
    expect(response.body.checkInDate).toEqual(payLoad.checkInDate);
    expect(response.body.checkOutDate).toEqual(payLoad.checkOutDate);
    expect(response.body.bookingId).toEqual(payLoad.bookingId);
    expect(response.body.rooms).toEqual(payLoad.rooms);
  });

  it("Cancel Booking", async () => {
    const payLoad = {
      checkInDate: "2025-02-23T18:30:00.000Z",
      checkOutDate: "2025-02-24T18:30:00.000Z",
      hotelId: "3",
      bookingId: 1,
      userId: "demo",
      rooms: 4,
      status: "CANCELED",
    };
    const response = await request(app)
      .put(`/api/v1/bookings/${payLoad.bookingId}`)
      .send(payLoad);
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual(payLoad.status);
  });

  it("Should return booking list", async () => {
    const bookingId = 1;
    const response = await request(app).get(`/api/v1/bookings/${bookingId}`);
    expect(response.status).toBe(200);
    expect(response.body.bookingId).toEqual(bookingId);
  });

  it("Delete Booking", async () => {
    const payLoad = {
      bookingId: 9,
    };
    const response = await request(app).delete(
      `/api/v1/bookings/${payLoad.bookingId}`
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Booking cancelled");
  });

  it("Should return booking list", async () => {
    const userId = "demo";
    const response = await request(app).get(`/api/v1/bookings/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
