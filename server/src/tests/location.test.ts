import request from "supertest";
import app from "../app"; // Import the Express app

describe("Hotel API Tests", () => {
  it("Should return location list", async () => {
    const response = await request(app).get("/api/v1/locations");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
