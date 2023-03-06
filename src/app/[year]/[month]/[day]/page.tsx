import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getDate as composeDate,
  longDateFormatter,
} from "@/utils/date-helpers";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import colombianHolidays from "colombian-holidays";
import sadFace from "svg-emojis/twemoji/1f641.svg";
import { ColombianHolidays } from "@/components/colombian-holidays";
import { Celebration as Celebration } from "@/components/celebration";
import happyFace from "svg-emojis/twemoji/1f600.svg";
import { Card } from "@/components/card";
import { Header } from "@/components/header";
import { YearNav } from "@/components/year-nav";
import { MonthNav } from "@/components/month-nav";
import { Main } from "@/components/main";

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
        <YearNav selectedMonth={month} selectedYear={year} />
        <MonthNav selectedMonth={month} selectedYear={year} selectedDay={day} />
      </Header>
      <Main>
        <Card variant="hero" disableHover>
          <p>{longDateFormatter.format(date)}</p>
          {isHoliday(date) ? (
            <>
              <Celebration className="h-16 text-2xl font-bold">
                Is holiday!
              </Celebration>
              <Image src={happyFace} alt="smiley face" />
            </>
          ) : (
            <>
              <p className="text-2xl font-bold">Not holiday.</p>
              <Image src={sadFace} alt="crying face" />
            </>
          )}
        </Card>
      </Main>
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
