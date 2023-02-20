import colombianHolidays from "colombian-holidays";
import {
  longDateFormatter,
  relativeDateDifference,
} from "../utils/date-helpers";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { twMerge } from "tailwind-merge";

interface HolidaysListProps {
  year: number;
  month?: number;
}
export function HolidaysList({ year, month }: HolidaysListProps) {
  const allHolidays = colombianHolidays(Number(year), {
    returnNativeDate: true,
  });
  const holidays = month
    ? allHolidays.filter(
        (holiday) => holiday.celebrationDate.getUTCMonth() + 1 === month
      )
    : allHolidays;
  const today = new Date();
  const currentYear = today.getUTCFullYear();
  const isCurrentYear = currentYear === year;
  return (
    <ol className="flex flex-col gap-4">
      {holidays.map((holiday) => {
        const alreadyOver = holiday.celebrationDate < today;
        return (
          <li key={holiday.name.en} className="">
            <div
              className={twMerge(
                "text-md sm:text-lg",
                isCurrentYear && alreadyOver && "text-slate-400"
              )}
            >
              {holiday.name.en}
            </div>
            <time dateTime={holiday.celebrationDate.toISOString()}>
              <div className={"text-xl sm:text-2xl"}>
                {longDateFormatter.format(holiday.celebrationDate)}
              </div>
              {isCurrentYear && (
                <div className="text-sm text-slate-400 sm:text-base">
                  {formatDistanceToNow(holiday.celebrationDate)}
                </div>
              )}
            </time>
          </li>
        );
      })}
    </ol>
  );
}
