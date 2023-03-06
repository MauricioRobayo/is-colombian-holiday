import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Main } from "@/components/main";
import { MonthNav } from "@/components/month-nav";
import { SadCard } from "@/components/sad-card";
import { YearNav } from "@/components/year-nav";
import { useHolidays } from "@/hooks/use-holidays";
import { getMonths } from "@/utils/get-months";
import { getYears } from "@/utils/get-years";
import { notFound } from "next/navigation";

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

  if (!holidays) {
    return notFound();
  }

  return (
    <>
      <Header>
        <YearNav selectedMonth={month} selectedYear={year} className="my-4" />
        <MonthNav selectedMonth={month} selectedYear={year} />
      </Header>
      <Main>
        {holidays.length === 0 ? (
          <SadCard>
            <p className="mb-4 text-2xl">
              No holidays on {getMonths()[month - 1]}.
            </p>
          </SadCard>
        ) : (
          <HolidaysList holidays={holidays} month={month} />
        )}
      </Main>
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
