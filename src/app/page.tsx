import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Main } from "@/components/main";
import { addUpcomingHoliday } from "@/hooks/use-holidays";
import { holidaysWithinInterval } from "colombian-holidays/lib/utils/holidaysWithinInterval";
import { useMemo } from "react";

export default function Home() {
  const holidays = useMemo(() => {
    const HOLIDAYS_TO_DISPLAY = 4;
    const today = new Date();
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
  }, []);
  return (
    <>
      <Header>Colombian Holidays</Header>
      <Main>
        <HolidaysList holidays={holidays} />
      </Main>
    </>
  );
}
