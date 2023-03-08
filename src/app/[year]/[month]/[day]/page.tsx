import Breadcrumbs from "@/components/breadcrumbs";
import { Calendar } from "@/components/calendar";
import { Card } from "@/components/card";
import { Celebration } from "@/components/celebration";
import { H1 } from "@/components/h1";
import { Header } from "@/components/header";
import { MonthList } from "@/components/month-list";
import { MonthNav } from "@/components/month-nav";
import { Nav } from "@/components/nav";
import { SadCard } from "@/components/sad-card";
import { Wrapper } from "@/components/wrapper";
import { YearNav } from "@/components/year-nav";
import {
  formatDateAsPath,
  getDate as composeDate,
  longDateFormatter,
} from "@/utils/date-helpers";
import { monthFormatter } from "@/utils/get-months";
import colombianHolidays from "colombian-holidays";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import happyFace from "svg-emojis/twemoji/1f600.svg";

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
      <Breadcrumbs
        breadcrumbs={[
          { name: String(year), path: String(year) },
          { name: String(month), path: `/${year}/${month}` },
          { name: String(day) },
        ]}
      />
      <Wrapper as="main" className="my-8">
        <H1>Is Colombian Holiday?</H1>
        {isHoliday(date) ? (
          <Card variant="hero" disableHover>
            <p>{longDateFormatter.format(date)}</p>
            <Celebration className="h-16 text-2xl font-bold">
              Is holiday!
            </Celebration>
            <Image src={happyFace} alt="smiley face" />
          </Card>
        ) : (
          <SadCard>
            <p>{longDateFormatter.format(date)}</p>
            <p className="mt-2 text-2xl font-bold">Not holiday.</p>
          </SadCard>
        )}
        <Nav prev={prev} next={next} className="mt-4 mb-8 text-sm" />
        <MonthNav year={year} month={month} className="mb-2 text-lg" />
        <Calendar year={year} month={month} day={day} />
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
