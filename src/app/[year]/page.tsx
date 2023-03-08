import Breadcrumbs from "@/components/breadcrumbs";
import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { MonthList } from "@/components/month-list";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import { useHolidays } from "@/hooks/use-holidays";
import { getYears } from "@/utils/get-years";
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
        <YearNav selectedYear={year} className="my-4" />
        <MonthList selectedYear={year} />
      </Header>
      <Breadcrumbs breadcrumbs={[{ name: String(year) }]} />
      <Wrapper as="main" className="my-8">
        <H1>{year} Colombian Holidays</H1>
        <HolidaysList holidays={holidays} />
      </Wrapper>
    </>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}
