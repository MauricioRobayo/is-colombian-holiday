import { notFound } from "next/navigation";
import Image from "next/image";
import { ColombianHolidays } from "../../../../components/colombian-holidays";
import { getDate, longDateFormatter } from "../../../../utils/date-helpers";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import colombianHolidays from "colombian-holidays";
import smileyFace from "svg-emojis/twemoji/1f603.svg";
import stars from "svg-emojis/twemoji/2728.svg";
import cryingFace from "svg-emojis/twemoji/1f622.svg";

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
      <div className="flex flex-col items-center gap-4 text-2xl">
        <p>{longDateFormatter.format(date)}</p>
        {isHoliday(date) ? (
          <>
            <p className="flex gap-4 uppercase">
              <Image src={stars} alt="stars" />
              Is holiday
              <Image src={stars} alt="stars" />
            </p>
            <Image src={smileyFace} alt="smiley face" />
          </>
        ) : (
          <>
            <p>Not holiday</p>
            <Image src={cryingFace} alt="crying face" />
          </>
        )}
      </div>
    </ColombianHolidays>
  );
}

export function generateStaticParams() {
  const holidays = colombianHolidays({ returnNativeDate: true });
  return holidays.map((holiday) => ({
    year: String(holiday.celebrationDate.getUTCFullYear()),
    month: String(holiday.celebrationDate.getUTCMonth() + 1),
    day: String(holiday.celebrationDate.getUTCDate()),
  }));
}
