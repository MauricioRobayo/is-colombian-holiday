import { holidaysWithinInterval } from "colombian-holidays/lib/utils/holidaysWithinInterval";
import { useMemo } from "react";
import { addUpcomingHoliday } from "./use-holidays";

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
    holidaysWithinInterval({
      start: startDate,
      end: endDate,
      valueAsDate: true,
    })
  );
  const startIndex = holidays.findIndex((holiday) => holiday.isUpcoming);
  const endIndex = startIndex + HOLIDAYS_TO_DISPLAY;
  return holidays.slice(startIndex, endIndex);
}
