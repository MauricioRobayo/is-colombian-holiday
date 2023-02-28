import { notFound } from "next/navigation";
import Image from "next/image";
import { getDate, longDateFormatter } from "@/utils/date-helpers";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import colombianHolidays from "colombian-holidays";
import cryingFace from "svg-emojis/twemoji/1f622.svg";
import { ColombianHolidays } from "@/components/colombian-holidays";
import { Celebration as Celebration } from "@/components/celebration";
import smileyFace from "svg-emojis/twemoji/1f600.svg";
import { Card } from "@/components/card";

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
  const date = getDate(year, month, day);

  if (Number.isNaN(date.getTime())) {
    return notFound();
  }

  return (
    <ColombianHolidays year={year} month={month} day={day}>
      <Card
        className="flex flex-col items-center gap-4 border-4 border-orange-600 p-8 text-2xl"
        disableHover
      >
        <p>{longDateFormatter.format(date)}</p>
        {isHoliday(date) ? (
          <>
            <Celebration className="h-16 font-bold uppercase">
              Is Holiday!
            </Celebration>
            <Image src={smileyFace} alt="smiley face" />
          </>
        ) : (
          <>
            <p>Not holiday</p>
            <Image src={cryingFace} alt="crying face" />
          </>
        )}
      </Card>
    </ColombianHolidays>
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
