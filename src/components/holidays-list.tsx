import colombianHolidays from "colombian-holidays";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { longDateFormatterWithoutYear, timeAgo } from "../utils/date-helpers";
import { getMonths } from "../utils/get-months";
import Image from "next/image";
import cryingFace from "svg-emojis/twemoji/1f622.svg";

interface HolidaysListProps {
  year: number;
  month?: number;
}
export function HolidaysList({ year, month }: HolidaysListProps) {
  const holidays = colombianHolidays({
    year,
    month,
    returnNativeDate: true,
  });
  const today = new Date();
  const currentYear = today.getUTCFullYear();
  const isCurrentYear = currentYear === year;
  const months = getMonths();

  if (holidays.length === 0 && month) {
    return (
      <div className="flex flex-col items-center gap-4 text-2xl">
        <p>No holidays on {months[month - 1]}.</p>
        <Image src={cryingFace} alt="crying face" />
      </div>
    );
  }
  return (
    <ol className="flex flex-col gap-4">
      {holidays.map((holiday) => {
        const alreadyOver = holiday.celebrationDate < today;
        return (
          <li key={holiday.name.en} className="">
            <Link
              href={`/${holiday.celebrationDate
                .toISOString()
                .slice(0, 10)
                .split("-")
                .map(Number)
                .join("/")}`}
            >
              <div
                className={twMerge(
                  "text-md sm:text-lg",
                  isCurrentYear && alreadyOver && "text-slate-400"
                )}
              >
                {holiday.name.en}
              </div>
              <time dateTime={holiday.celebrationDate.toISOString()}>
                {(!isCurrentYear || !alreadyOver) && (
                  <div className={"text-xl sm:text-2xl"}>
                    {longDateFormatterWithoutYear.format(
                      holiday.celebrationDate
                    )}
                  </div>
                )}
                {isCurrentYear && (
                  <div className="text-sm text-slate-400 sm:text-base">
                    {timeAgo.format(holiday.celebrationDate)}
                  </div>
                )}
              </time>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
