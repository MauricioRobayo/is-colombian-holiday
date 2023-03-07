import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import { addUpcomingHoliday } from "@/hooks/use-holidays";
import { holidaysWithinInterval } from "colombian-holidays/lib/utils/holidaysWithinInterval";
import { Link } from "@/components/link";
import { useMemo } from "react";
import { YearsList } from "@/components/years-list";

const today = new Date();

export default function Home() {
  const holidays = useMemo(() => {
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
  }, []);
  return (
    <>
      <Header>
        <YearsList />
      </Header>
      <Wrapper as="main">
        <h2 className="text-lg font-bold uppercase sm:text-xl">
          Upcoming holidays in Colombia
        </h2>
        <HolidaysList holidays={holidays} className="my-8" />
        <div>
          <Link href={`/${today.getUTCFullYear()}`}>
            Full list of {today.getUTCFullYear()} colombian holidays
          </Link>
        </div>
      </Wrapper>
    </>
  );
}
