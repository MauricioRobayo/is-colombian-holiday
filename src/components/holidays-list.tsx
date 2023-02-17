import colombianHolidays from "colombian-holidays";
import {
  longDateFormatter,
  relativeDateDifference,
  relativeTime,
} from "../utils/date-helpers";

interface HolidaysListProps {
  year: number;
}
export function HolidaysList({ year }: HolidaysListProps) {
  const holidays = colombianHolidays(Number(year), {
    returnNativeDate: true,
  });
  const today = new Date();
  const currentYear = today.getUTCFullYear();
  return (
    <ol className="flex flex-col gap-4">
      {holidays.map((holiday) => {
        const daysDiff = Math.floor(
          (holiday.celebrationDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24
        );
        return (
          <li key={holiday.name.en} className="">
            <div className="text-md sm:text-lg">{holiday.name.en}</div>
            <time
              className="text-xl sm:text-2xl"
              dateTime={holiday.celebrationDate.toISOString()}
            >
              {longDateFormatter.format(holiday.celebrationDate)}
            </time>
            {currentYear === year && (
              <div>
                {relativeDateDifference(today, holiday.celebrationDate)}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
