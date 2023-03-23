import { timeAgo } from "@/utils/date-helpers";

afterAll(() => {
  jest.useRealTimers();
});

describe("timeAgo", () => {
  jest.useFakeTimers();
  const cases = [
    ["2023-02-01T05:00:00.000Z", "2023-02-02T00:00:00.000Z", "tomorrow"],
    ["2023-02-01T00:00:00.000Z", "2023-02-02T23:59:59.999Z", "tomorrow"],
    ["2023-02-01T05:00:00.000Z", "2023-01-31T00:00:00.000Z", "yesterday"],
    ["2023-02-01T00:00:00.000Z", "2023-01-31T23:59:59.999Z", "yesterday"],
    ["2023-02-01T05:00:00.000Z", "2023-02-03T00:00:00.000Z", "in 2 days"],
    ["2023-02-01T05:00:00.000Z", "2023-01-30T00:00:00.000Z", "2 days ago"],
    ["2023-02-01", "2023-03-01", "in 4 weeks"],
    ["2023-02-01", "2023-03-08", "next month"],
    ["2023-12-31", "2024-01-01", "tomorrow"],
    ["2023-11-30", "2023-12-01", "tomorrow"],
    ["2023-12-01", "2024-01-15", "next month"],
    ["2023-12-01", "2023-12-31", "in 4 weeks"],
    ["2023-01-01", "2023-02-01", "in 4 weeks"],
    ["2023-01-15", "2023-02-15", "in 4 weeks"],
  ];
  it.each(cases)(
    "being %p timeAgo(%p) should return %p",
    (startDate, date, expected) => {
      jest.setSystemTime(new Date(startDate));
      const relativeTime = timeAgo(new Date(date));
      expect(relativeTime).toBe(expected);
    }
  );
});
