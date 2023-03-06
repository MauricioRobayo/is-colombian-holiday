import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { MonthNav } from "@/components/month-nav";
import { YearNav } from "@/components/year-nav";
import { useHolidays } from "@/hooks/use-holidays";
import { getYears } from "@/utils/get-years";
import { Main } from "@/components/main";
import { notFound } from "next/navigation";

interface YearProps {
  params: {
    year: string;
  };
}
export default function Year({ params }: YearProps) {
  const year = Number(params.year);
  const holidays = useHolidays({ year });

  if (!holidays) {
    return notFound();
  }

  return (
    <>
      <Header>
        <YearNav selectedYear={year} />
        <MonthNav selectedYear={year} />
      </Header>
      <Main>
        <HolidaysList holidays={holidays} />
      </Main>
    </>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}
