import { Header } from "@/components/header";
import { useHolidays } from "@/hooks/use-holidays";
import { notFound } from "next/navigation";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { getYears } from "@/utils/get-years";
import { YearNav } from "@/components/year-nav";
import { MonthNav } from "@/components/month-nav";
import { Main } from "@/components/main";

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
        <YearNav selectedMonth={month} selectedYear={year} />
        <MonthNav selectedMonth={month} selectedYear={month} />
      </Header>
      <Main>
        <HolidaysList holidays={holidays} month={month} />
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
