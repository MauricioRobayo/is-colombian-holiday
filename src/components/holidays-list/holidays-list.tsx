import { useHolidaysWithUpcomingHoliday } from "@/hooks/use-holidays-with-upcoming-holiday";
import colombianHolidays from "colombian-holidays";
import Image from "next/image";
import cryingFace from "svg-emojis/twemoji/1f622.svg";
import { getMonths } from "../../utils/get-months";
import { HolidayListItem } from "./holiday-list-item";

const today = new Date();

interface HolidaysListProps {
  year: number;
  month?: number;
}
export function HolidaysList({ year, month }: HolidaysListProps) {
  const holidays = colombianHolidays({
    year,
    valueAsDate: true,
  });
  const months = getMonths();
  const holidaysWithUpcomingHoliday = useHolidaysWithUpcomingHoliday(
    holidays
  ).filter((holiday) =>
    month ? holiday.celebrationDate.getUTCMonth() + 1 === month : true
  );

  if (holidaysWithUpcomingHoliday.length === 0 && month) {
    return (
      <div className="flex flex-col items-center gap-4 text-2xl">
        <p>No holidays on {months[month - 1]}.</p>
        <Image src={cryingFace} alt="crying face" />
      </div>
    );
  }
  return (
    <ol className="flex flex-col gap-4">
      {holidaysWithUpcomingHoliday.map((holiday, index) => {
        const isCurrentYear =
          holiday.celebrationDate.getUTCFullYear() === today.getUTCFullYear();
        const isOver = isCurrentYear && holiday.celebrationDate < today;
        return (
          <HolidayListItem
            key={holiday.celebrationDate.toISOString()}
            date={holiday.celebrationDate}
            name={holiday.name.en}
            dim={isCurrentYear && isOver && !month}
            highlight={holiday.isUpcoming}
          />
        );
      })}
    </ol>
  );
}
