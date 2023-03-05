import { useHolidaysWithUpcomingHoliday } from "@/hooks/use-holidays-with-upcoming-holiday";
import colombianHolidays from "colombian-holidays";
import Image from "next/image";
import cryingFace from "svg-emojis/twemoji/1f622.svg";
import { getMonths } from "../../utils/get-months";
import { HolidayListItem, ListItemProps } from "./holiday-list-item";

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
      {holidaysWithUpcomingHoliday.map((holiday) => {
        const variant = getVariant({
          isCurrentYear:
            holiday.celebrationDate.getUTCFullYear() === today.getUTCFullYear(),
          isOver: holiday.celebrationDate < today,
          month,
          isUpcoming: holiday.isUpcoming,
        });
        return (
          <HolidayListItem
            key={holiday.date.toISOString()}
            date={holiday.celebrationDate}
            name={holiday.name.en}
            variant={variant}
          />
        );
      })}
    </ol>
  );
}

function getVariant({
  isCurrentYear,
  isOver,
  month,
  isUpcoming,
}: {
  isCurrentYear: boolean;
  isOver: boolean;
  month: number | undefined;
  isUpcoming: boolean;
}): ListItemProps["variant"] {
  if (isCurrentYear && isOver && month !== undefined) {
    return "dim";
  }

  if (isUpcoming) {
    return "highlight";
  }

  return "default";
}
