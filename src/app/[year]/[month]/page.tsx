import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Link } from "@/components/link";
import { MonthNav } from "@/components/month-nav";
import { SadCard } from "@/components/sad-card";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import { useHolidays } from "@/hooks/use-holidays";
import { getMonths } from "@/utils/get-months";
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
  const { prev, next } = useMemo(() => {
    const prevMonth = new Date(Date.UTC(year, month - 2, 1));
    const nextMonth = new Date(Date.UTC(year, month, 1));
    return {
      prev: {
        month: prevMonth.getUTCMonth() + 1,
        name: monthNames[prevMonth.getUTCMonth()],
        year: prevMonth.getUTCFullYear(),
      },
      next: {
        month: nextMonth.getUTCMonth() + 1,
        name: monthNames[nextMonth.getUTCMonth()],
        year: nextMonth.getUTCFullYear(),
      },
    };
  }, [year, month]);

  if (!holidays) {
    return notFound();
  }

  return (
    <>
      <Header>
        <YearNav selectedMonth={month} selectedYear={year} className="my-4" />
        <MonthNav selectedMonth={month} selectedYear={year} />
      </Header>
      <Wrapper className="flex flex-col gap-4">
        <h2 className="text-2xl">{monthNames[month - 1]} Holidays</h2>
        {holidays.length === 0 ? (
          <SadCard>
            <p>
              No holidays in {monthNames[month - 1]}, {year}.
            </p>
          </SadCard>
        ) : (
          <HolidaysList holidays={holidays} month={month} />
        )}
        <div className="flex justify-between text-sm">
          <div>
            <Link href={`/${prev.year}/${prev.month}`}>
              &larr; {`${prev.name}, ${prev.year}`}
            </Link>
          </div>
          <div>
            <Link href={`/${next.year}/${next.month}`}>
              {`${next.name}, ${next.year}`} &rarr;
            </Link>
          </div>
        </div>
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
