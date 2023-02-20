import colombianHolidays from "colombian-holidays";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { longDateFormatter, timeAgo } from "../utils/date-helpers";

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
                    {longDateFormatter.format(holiday.celebrationDate)}
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
