import { ColombianHolidayWithNativeDate } from "colombian-holidays/lib/types";
import { useMemo } from "react";

export function useHolidaysWithUpcomingHoliday(
  holidays: ColombianHolidayWithNativeDate[]
) {
  return useMemo(() => {
    return holidays.map((holiday, index) => ({
      ...holiday,
      isUpcoming:
        holidays[index - 1]?.celebrationDate < new Date() &&
        holiday.celebrationDate > new Date(),
    }));
  }, [holidays]);
}
