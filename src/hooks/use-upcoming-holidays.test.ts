import { getUpcomingHolidays } from "./use-upcoming-holidays";

it("should return the list of upcoming holidays", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2023-03-20T00:00:00.000Z"));
  const upcoming = getUpcomingHolidays();
  console.log(upcoming);
  expect(upcoming.length).toBe(4);
});
