import { getUpcomingHolidays } from "./use-upcoming-holidays";

beforeEach(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it("should not include today if today is a holiday", () => {
  jest.setSystemTime(new Date("2023-03-20T00:00:00.000Z"));
  const upcoming = getUpcomingHolidays();
  const [next] = upcoming;
  expect(upcoming.length).toBe(4);
  expect(next.celebrationDate.toISOString()).toBe("2023-04-06T00:00:00.000Z");
});

it("should return the list of the next 4 upcoming holidays", () => {
  jest.setSystemTime(new Date("2023-03-19T00:00:00.000Z"));
  const upcoming = getUpcomingHolidays();
  const [next] = upcoming;
  expect(upcoming.length).toBe(4);
  expect(next.celebrationDate.toISOString()).toBe("2023-03-20T00:00:00.000Z");
});
