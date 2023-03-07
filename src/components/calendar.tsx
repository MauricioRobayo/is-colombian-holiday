import { getMonthDates } from "@/utils/get-month-dates";
import cn from "clsx";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface CalendarProps {
  year: number;
  month: number;
  className?: string;
}
export function Calendar({ year, month, className }: CalendarProps) {
  const dates = getMonthDates({ year, month });
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div
      className={twMerge(
        "place-center mx-auto grid w-fit grid-cols-[repeat(7,auto)] justify-center gap-y-1 gap-x-2 rounded-lg bg-white p-4 text-xs",
        className
      )}
    >
      {days.map((day) => (
        <div key={day} className="text-slate-400">
          {day}
        </div>
      ))}
      {dates.map((date, index) => {
        return (
          <Link
            key={date.toISOString()}
            href={`/${year}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`}
            className={cn("rounded-full p-1", {
              [`col-start-${date.getUTCDay()}`]: index === 0,
              "bg-violet-600 text-white": isHoliday(date),
            })}
          >
            <time dateTime={date.toISOString()}>{date.getUTCDate()}</time>
          </Link>
        );
      })}
    </div>
  );
}
