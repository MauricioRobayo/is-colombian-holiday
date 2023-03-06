import { Card } from "@/components/card";
import { Celebration } from "@/components/celebration";
import { Header } from "@/components/header";
import { Wrapper } from "@/components/wrapper";
import { MonthNav } from "@/components/month-nav";
import { SadCard } from "@/components/sad-card";
import { YearNav } from "@/components/year-nav";
import {
  getDate as composeDate,
  longDateFormatter,
} from "@/utils/date-helpers";
import colombianHolidays from "colombian-holidays";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import { notFound } from "next/navigation";
import happyFace from "svg-emojis/twemoji/1f600.svg";
import Image from "next/image";

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

  if (Number.isNaN(date.getTime())) {
    return notFound();
  }

  return (
    <>
      <Header>
        <YearNav selectedMonth={month} selectedYear={year} className="my-4" />
        <MonthNav selectedMonth={month} selectedYear={year} selectedDay={day} />
      </Header>
      <Wrapper>
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
