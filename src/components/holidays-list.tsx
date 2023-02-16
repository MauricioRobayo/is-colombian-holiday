import colombianHolidays from "colombian-holidays";
import { longDateFormatter } from "../utils/date-helpers";

interface HolidaysListProps {
  year: number;
}
export function HolidaysList({ year }: HolidaysListProps) {
  const holidays = colombianHolidays(Number(year), {
    returnNativeDate: true,
  });
  return (
    <ol className="flex flex-col gap-4">
      {holidays.map((holiday) => {
        return (
          <li key={holiday.name.en} className="">
            <time
              className="text-xl sm:text-2xl"
              dateTime={holiday.celebrationDate.toISOString()}
            >
              {longDateFormatter.format(holiday.celebrationDate)}
            </time>
            <div className="text-md sm:text-lg">{holiday.name.en}</div>
          </li>
        );
      })}
    </ol>
  );
}
