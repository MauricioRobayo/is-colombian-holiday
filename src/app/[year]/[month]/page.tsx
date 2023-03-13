import { Calendar } from "@/components/calendar";
import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { MonthList } from "@/components/month-list";
import { MonthNav } from "@/components/month-nav";
import { Nav } from "@/components/nav";
import { SadCard } from "@/components/sad-card";
import { SubHeader } from "@/components/sub-header";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import { useHolidays } from "@/hooks/use-holidays";
import { useMonthNav } from "@/hooks/use-month-nav";
import { getMonths } from "@/utils/get-months";
import { getYears } from "@/utils/get-years";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
      <SubHeader
        breadcrumbs={[
          { name: String(year), path: String(year) },
          { name: String(month) },
        ]}
      />
      <Wrapper as="main" className="my-8">
        <H1>
          Holidays in Colombia
          <br />
          {monthNames[month - 1]} {year}
        </H1>
        <MonthNav year={year} month={month} className="text-md mb-2" />
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
        <Nav prev={prev} next={next} className="mt-4 text-sm" />
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

export function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Metadata {
  const monthName = monthNames[Number(params.month) - 1];
  return {
    title: `Public Holidays in Colombia during ${monthName}, ${params.year}`,
    description: `Complete list of all public Holidays in Colombia during ${monthName}, ${params.year}`,
    openGraph: {
      title: `Public Holidays in Colombia for ${monthName}, ${params.year}`,
      description: `Complete list of all public Holidays in Colombia for ${monthName}, ${params.year}`,
      url: `https://iscolombian.holiday/${params.year}/${params.month}`,
      siteName: "Colombian Holidays",
      locale: "en-US",
      type: "website",
    },
  };
}
