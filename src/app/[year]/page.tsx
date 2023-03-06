import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { MonthNav } from "@/components/month-nav";
import { YearNav } from "@/components/year-nav";
import { useHolidays } from "@/hooks/use-holidays";
import { getYears } from "@/utils/get-years";
import { Wrapper } from "@/components/wrapper";
import { notFound } from "next/navigation";
import { YearsList } from "@/components/years-list";

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
        <YearNav selectedYear={year} className="my-4" />
        <MonthNav selectedYear={year} />
      </Header>
      <Wrapper as="main">
        <HolidaysList holidays={holidays} />
      </Wrapper>
      <Wrapper as="aside">
        <YearsList selectedYear={year} />
      </Wrapper>
    </>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}
