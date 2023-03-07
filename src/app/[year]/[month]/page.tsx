import { Calendar } from "@/components/calendar";
import { Footer } from "@/components/footer";
import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Link } from "@/components/link";
import { MonthList } from "@/components/month-list";
import { Nav } from "@/components/nav";
import { SadCard } from "@/components/sad-card";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import { YearsList } from "@/components/years-list";
import { useHolidays } from "@/hooks/use-holidays";
import { useMonthNav } from "@/hooks/use-month-nav";
import { getMonths, monthFormatter } from "@/utils/get-months";
import { getYears } from "@/utils/get-years";
import { notFound } from "next/navigation";
import { useMemo } from "react";

const monthNames = getMonths();
interface MonthProps {
  params: {
    year: string;
    month: string;
  };
}
export default function Month({ params }: MonthProps) {
  const year = Number(params.year);
  const month = Number(params.month);
  const holidays = useHolidays({ year, month });
  const { prev, next } = useMonthNav({ year, month });

  if (!holidays) {
    return notFound();
  }

  return (
    <>
      <Header>
        <YearNav selectedMonth={month} selectedYear={year} className="my-4" />
        <MonthList selectedMonth={month} selectedYear={year} />
      </Header>
      <Wrapper as="main" className="my-8">
        <H1>
          <Link href={`/${prev.year}/${prev.month}`} className="mr-2">
            &larr;
          </Link>
          {monthNames[month - 1]} {year} Holidays
          <Link href={`/${next.year}/${next.month}`} className="ml-2">
            &rarr;
          </Link>
        </H1>
        <Calendar month={month} year={year} className="mb-4" />
        {holidays.length === 0 ? (
          <SadCard>
            <p>
              No holidays in {monthNames[month - 1]}, {year}.
            </p>
          </SadCard>
        ) : (
          <HolidaysList holidays={holidays} month={month} />
        )}
        <Nav prev={prev} next={next} className="mt-4" />
      </Wrapper>
    </>
  );
}

export function generateStaticParams() {
  return getYears().flatMap((year) =>
    Array.from({ length: 12 }, (_, i) => ({
      year: String(year),
      month: String(i + 1),
    }))
  );
}
