import { timeAgo } from "@/utils/date-helpers";

afterAll(() => {
  jest.useRealTimers();
});

describe("timeAgo", () => {
  jest.useFakeTimers();
  const cases = [
    ["2023-02-01T05:00:00.000Z", "2023-02-02T00:00:00.000Z", "in 1 day"],
    ["2023-02-01T00:00:00.000Z", "2023-02-02T23:59:59.999Z", "in 1 day"],
    ["2023-02-01T05:00:00.000Z", "2023-01-31T00:00:00.000Z", "1 day ago"],
    ["2023-02-01T00:00:00.000Z", "2023-01-31T23:59:59.999Z", "1 day ago"],
    ["2023-02-01T05:00:00.000Z", "2023-02-03T00:00:00.000Z", "in 2 days"],
    ["2023-02-01T05:00:00.000Z", "2023-01-30T00:00:00.000Z", "2 days ago"],
    ["2023-02-01", "2023-03-01", "in 4 weeks"],
    ["2023-02-01", "2023-03-08", "in 1 month"],
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
