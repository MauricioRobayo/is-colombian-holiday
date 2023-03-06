import { parseDate } from "@/utils/date-helpers";
import colombianHolidays from "colombian-holidays";
import { ColombianHolidayWithNativeDate } from "colombian-holidays/lib/types";
import { useMemo } from "react";

interface HolidaysOptions {
  year: number;
  month?: number;
}

export function useHolidays({ year, month }: HolidaysOptions) {
  return useMemo(() => {
    if (Number.isNaN(parseDate(year, 1, 1))) {
      return null;
    }
    if (month && (month < 1 || month > 12)) {
      return null;
    }
    const holidays = colombianHolidays({ year, valueAsDate: true });
    return addUpcomingHoliday(holidays).filter((holiday) =>
      month ? holiday.celebrationDate.getUTCMonth() + 1 === month : true
    );
  }, [year, month]);
}

export function addUpcomingHoliday(
  holidays: ReadonlyArray<ColombianHolidayWithNativeDate>
) {
  return holidays.map((holiday, index) => ({
    ...holiday,
    isUpcoming:
      holidays[index - 1]?.celebrationDate < new Date() &&
      holiday.celebrationDate > new Date(),
  }));
}
