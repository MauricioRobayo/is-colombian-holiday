import { CelebrationCard } from "@/components/CelebrationCard";
import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { MonthList } from "@/components/month-list";
import { Nav } from "@/components/nav";
import { SadCard } from "@/components/sad-card";
import { SubHeader } from "@/components/sub-header";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import {
  composeDate,
  formatDateAsPath,
  longDateFormatter,
} from "@/utils/date-helpers";
import colombianHolidays from "colombian-holidays";
import { getHoliday } from "colombian-holidays/lib/utils/getHoliday";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { useMemo } from "react";

interface DayProps {
  params: {
    year: string;
    month: string;
    day: string;
  };
}
export default function Day({ params }: DayProps) {
  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);
  const date = composeDate(year, month, day);
  const longFormattedDate = longDateFormatter.format(date);
  const holiday = getHoliday(date);
  const { prev, next } = useMemo(() => {
    const prevDay = new Date(Date.UTC(year, month - 1, day - 1));
    const nextDay = new Date(Date.UTC(year, month - 1, day + 1));
    return {
      prev: {
        name: longDateFormatter.format(prevDay).replace(/.*?,\s/, ""),
        path: formatDateAsPath(prevDay),
      },
      next: {
        name: longDateFormatter.format(nextDay).replace(/.*?,\s/, ""),
        path: formatDateAsPath(nextDay),
      },
    };
  }, [year, month, day]);

  if (Number.isNaN(date.getTime())) {
    return notFound();
  }

  return (
    <>
      <Header>
        <YearNav selectedMonth={month} selectedYear={year} className="my-4" />
        <MonthList
          selectedMonth={month}
          selectedYear={year}
          selectedDay={day}
        />
      </Header>
      <SubHeader
        breadcrumbs={[
          { name: String(year), path: String(year) },
          { name: String(month), path: `/${year}/${month}` },
          { name: String(day) },
        ]}
      />
      <Wrapper as="main" className="my-8">
        <H1>{longFormattedDate}</H1>
        {holiday ? (
          <CelebrationCard>
            <div>
              <p>{longFormattedDate}</p>
              <p>{holiday.name.en}</p>
            </div>
          </CelebrationCard>
        ) : (
          <SadCard>
            <p>{longFormattedDate}</p>
          </SadCard>
        )}
        <Nav prev={prev} next={next} className="mt-4 text-sm" />
      </Wrapper>
    </>
  );
}

export function generateStaticParams() {
  const holidays = colombianHolidays({ valueAsDate: true });
  return holidays.map((holiday) => ({
    year: String(holiday.celebrationDate.getUTCFullYear()),
    month: String(holiday.celebrationDate.getUTCMonth() + 1),
    day: String(holiday.celebrationDate.getUTCDate()),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { year: string; month: string; day: string };
}): Metadata {
  const apiBaseUrl = process.env.API_BASE_URL ?? "/api";
  const date = composeDate(
    Number(params.year),
    Number(params.month),
    Number(params.day),
  );
  const formattedDate = longDateFormatter.format(date);
  const searchParams = new URLSearchParams({
    date: date.toISOString(),
  });
  const holiday = getHoliday(date);

  return {
    title: formattedDate,
    description: `${formattedDate} ${
      holiday ? holiday.name.en : "Is not holiday in Colombia"
    }`,
    openGraph: {
      title: formattedDate,
      description: holiday ? holiday.name.en : "Not holiday in Colombia",
      siteName: "Colombian Holidays",
      locale: "en-US",
      type: "website",
      url: `https://iscolombian.holiday/${params.year}/${params.month}/${params.day}`,
      images: [
        {
          url: `${apiBaseUrl}/og?${searchParams}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
