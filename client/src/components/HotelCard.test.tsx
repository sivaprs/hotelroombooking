import React from "react";
import { render, screen } from "@testing-library/react";
import HotelCard from "./HotelCard";

test("renders learn react link", () => {
  render(
    <HotelCard
      name="best hotel"
      location="Chennai - TamilNadu - India"
      id={1}
      description="Delux hotel"
    />
  );
  const element = screen.getByText(/best hotel/i);
  expect(element).toBeInTheDocument();
});
