import { CelebrationCard } from "@/components/CelebrationCard";
import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Link } from "@/components/link";
import { SadCard } from "@/components/SadCard";
import { Wrapper } from "@/components/wrapper";
import { YearsList } from "@/components/years-list";
import { useUpcomingHolidays } from "@/hooks/use-upcoming-holidays";
import { formatDateAsPath, longDateFormatter } from "@/utils/date-helpers";
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
          <CelebrationCard title="Today is holiday!">
            <div>
              <p>
                <Link href={formatDateAsPath(today)}>
                  {longDateFormatter.format(today)}
                </Link>
              </p>
              <p>{holiday.name.en}</p>
            </div>
          </CelebrationCard>
        ) : (
          <SadCard title="Today is not holiday">
            <p>
              <Link href={formatDateAsPath(today)}>
                {longDateFormatter.format(today)}
              </Link>
            </p>
          </SadCard>
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
