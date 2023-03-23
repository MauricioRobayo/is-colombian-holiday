import { ColombianHolidayWithNativeDate } from "colombian-holidays/lib/types";
import { holidaysWithinInterval } from "colombian-holidays/lib/utils/holidaysWithinInterval";
import { useMemo } from "react";
import { addUpcomingHoliday } from "./use-holidays";

function mockUpcomingHolidayFactory(): ColombianHolidayWithNativeDate {
  const date = new Date("2023-03-24T00:00:00.000Z");
  return {
    celebrationDate: date,
    date: date,
    nextMonday: false,
    name: {
      en: "mock Holiday",
      es: "mock Holiday",
    },
  };
}

export function useUpcomingHolidays() {
  return useMemo(getUpcomingHolidays, []);
}

export function getUpcomingHolidays() {
  const today = new Date();
  const HOLIDAYS_TO_DISPLAY = 4;
  const startDate = new Date(today);
  const endDate = new Date(today);
  startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
  endDate.setUTCFullYear(endDate.getUTCFullYear() + 1);
  const holidays = addUpcomingHoliday(
    [
      mockUpcomingHolidayFactory(),
      ...holidaysWithinInterval({
        start: startDate,
        end: endDate,
        valueAsDate: true,
      }),
    ].sort((a, b) => a.celebrationDate.getTime() - b.celebrationDate.getTime())
  );
  const startIndex = holidays.findIndex((holiday) => holiday.isUpcoming);
  const endIndex = startIndex + HOLIDAYS_TO_DISPLAY;
  return holidays.slice(startIndex, endIndex);
}
