import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { HolidaysList } from "@/components/holidays-list/holidays-list";
import { Link } from "@/components/link";
import { MonthList } from "@/components/month-list";
import { SubHeader } from "@/components/sub-header";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import { useHolidays } from "@/hooks/use-holidays";
import { getYears } from "@/utils/get-years";
import { Metadata } from "next";
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
      <SubHeader breadcrumbs={[{ name: String(year) }]} />
      <Wrapper as="main" className="my-8">
        <H1>Holidays in Colombia {year}</H1>
        <HolidaysList holidays={holidays} />
        <Link href="/" className="mt-8 block">
          Upcoming holidays in Colombia
        </Link>
      </Wrapper>
    </>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}

export function generateMetadata({
  params,
}: {
  params: { year: string };
}): Metadata {
  return {
    title: `Public Holidays in Colombia ${params.year}`,
    description: `Complete list of all public Holidays in Colombia for year ${params.year}`,
    openGraph: {
      title: `Public Holidays in Colombia ${params.year}`,
      description: `Complete list of all public Holidays in Colombia for year ${params.year}`,
      url: `https://iscolombian.holiday/${params.year}`,
      siteName: "Colombian Holidays",
      locale: "en-US",
      type: "website",
    },
  };
}
