import { isSameDate } from "@/utils/date-helpers";
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
        "place-center mx-auto grid w-fit grid-cols-[repeat(7,auto)] justify-center gap-x-2 gap-y-1 rounded-lg bg-white p-4 text-xs",
        className,
      )}
    >
      {days.map((day) => (
        <div key={day} className="text-slate-400">
          {day}
        </div>
      ))}
      {dates.map((date, index) => {
        const colStarts = [
          "col-start-1",
          "col-start-2",
          "col-start-3",
          "col-start-4",
          "col-start-5",
          "col-start-6",
        ];

        const isToday = isSameDate(date, new Date());
        return (
          <div
            key={date.toISOString()}
            className={cn(
              "grid h-6 w-6 place-content-center rounded-full p-1",
              {
                [colStarts[date.getUTCDay()]]: index === 0,
                "bg-violet-600 text-white": isHoliday(date),
                " outline    outline-orange-600": isToday,
              },
            )}
          >
            {isToday ? (
              <time dateTime={date.toISOString()}>{date.getUTCDate()}</time>
            ) : (
              <Link
                key={date.toISOString()}
                href={`/${year}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`}
              >
                <time dateTime={date.toISOString()}>{date.getUTCDate()}</time>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
