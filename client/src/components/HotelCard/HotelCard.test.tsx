import { render, screen } from "@testing-library/react";
import HotelCard from "../HotelCard/HotelCard";

test("renders learn react link", () => {
  render(
    <HotelCard
      name="best hotel"
      location="Chennai - TamilNadu - India"
      id={1}
      description="Delux hotel"
      rating={1}
      price={1000}
    />
  );
  const element = screen.getByText(/best hotel/i);
  expect(element).toBeInTheDocument();
});
