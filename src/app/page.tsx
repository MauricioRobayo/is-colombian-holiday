import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Link } from "@/components/link";
import { Wrapper } from "@/components/wrapper";
import { YearsList } from "@/components/years-list";
import { useUpcomingHolidays } from "@/hooks/use-upcoming-holidays";

export default function Home() {
  const upcomingHolidays = useUpcomingHolidays();
  const today = new Date();
  return (
    <>
      <Header>
        <YearsList className="mt-8" />
      </Header>
      <Wrapper as="main" className="my-8">
        <H1>Upcoming holidays in Colombia</H1>
        <HolidaysList holidays={upcomingHolidays} className="my-8" />
        <div>
          <Link href={`/${today.getUTCFullYear()}`}>
            Full list of {today.getUTCFullYear()} colombian holidays
          </Link>
        </div>
      </Wrapper>
    </>
  );
}
