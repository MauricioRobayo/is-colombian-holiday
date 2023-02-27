import colombianHolidays from "colombian-holidays";
import Image from "next/image";
import cryingFace from "svg-emojis/twemoji/1f622.svg";
import { getMonths } from "../../utils/get-months";
import { HolidayListItem } from "./holiday-list-item";

interface HolidaysListProps {
  year: number;
  month?: number;
}
export function HolidaysList({ year, month }: HolidaysListProps) {
  const holidays = colombianHolidays({
    year,
    month,
    valueAsDate: true,
  });
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
        return (
          <HolidayListItem
            key={holiday.celebrationDate.toISOString()}
            date={holiday.celebrationDate}
            name={holiday.name.en}
          />
        );
      })}
    </ol>
  );
}
