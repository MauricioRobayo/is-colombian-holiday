import { CelebrationCard } from "@/components/CelebrationCard";
import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Link } from "@/components/link";
import { SadCard } from "@/components/SadCard";
import { Wrapper } from "@/components/wrapper";
import { YearsList } from "@/components/years-list";
import { useUpcomingHolidays } from "@/hooks/use-upcoming-holidays";
import { longDateFormatter } from "@/utils/date-helpers";
import { getHoliday } from "colombian-holidays/lib/utils/getHoliday";

export default function Home() {
  const upcomingHolidays = useUpcomingHolidays();
  const today = new Date();
  const holiday = getHoliday(today);
  return (
    <>
      <Header>
        <YearsList className="mt-8" />
      </Header>
      <Wrapper as="aside" className="mt-8 mb-4">
        {holiday ? (
          <CelebrationCard
            longFormattedDate={longDateFormatter.format(today)}
            holidayName={holiday.name.en}
            title="Today is holiday!"
          />
        ) : (
          <SadCard
            longFormattedDate={longDateFormatter.format(today)}
            title="Today is not holiday"
          />
        )}
      </Wrapper>
      <Wrapper as="main" className="mb-8">
        <H1>Upcoming holidays in Colombia</H1>
        <HolidaysList holidays={upcomingHolidays} className="mb-8" />
        <div>
          <Link href={`/${today.getUTCFullYear()}`}>
            Full list of {today.getUTCFullYear()} colombian holidays
          </Link>
        </div>
      </Wrapper>
    </>
  );
}
