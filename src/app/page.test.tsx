import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { after } from "node:test";
import exp from "constants";

beforeEach(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Home", () => {
  it("renders today as holiday and upcoming holidays", () => {
    jest.setSystemTime(new Date("2023-03-20T00:00:00.000Z"));

    render(<Home />);

    const complementary = screen.getByRole("complementary");
    const holidayDate = screen.getAllByText("Monday, March 20, 2023");
    const upcoming = screen.getAllByRole("listitem");

    expect(complementary).toHaveTextContent(
      "Today is holiday!Monday, March 20, 2023Saint Joseph's Day"
    );
    expect(holidayDate.length).toBe(1);
    expect(upcoming.length).toBe(4);
    expect(upcoming[0]).toHaveTextContent(
      "Thursday, April 6, 2023Maundy Thursdayin 2 weeks"
    );
  });

  it("today as not holiday and upcoming holidays", () => {
    jest.setSystemTime(new Date("2023-03-19T00:00:00.000Z"));

    render(<Home />);

    const complementary = screen.getByRole("complementary");
    const upcoming = screen.getAllByRole("listitem");

    expect(complementary).toHaveTextContent(
      "Today is not holidaySunday, March 19, 2023"
    );
    expect(upcoming.length).toBe(4);
    expect(upcoming[0]).toHaveTextContent(
      "Monday, March 20, 2023Saint Joseph's Daytomorrow"
    );
  });
});
