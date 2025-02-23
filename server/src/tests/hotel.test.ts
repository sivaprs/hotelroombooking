import request from "supertest";
import app from "../app"; // Import the Express app

describe("Hotel API Tests", () => {
  it("Hotel list", async () => {
    const response = await request(app).get("/api/v1/hotels");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0)
  });

  it("Hotel list by location", async () => {
    const locationId = 1;
    const response = await request(app).get(`/api/v1/hotels/location/${locationId}`);
    expect(response.status).toBe(200);
    expect(response.body.hotels.length).toBeGreaterThan(0)
  });

});