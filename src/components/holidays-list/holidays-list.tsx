import { ColombianHolidayWithNativeDate } from "colombian-holidays/lib/types";
import { HolidayListItem } from "./holiday-list-item";

const today = new Date();
interface Holiday extends ColombianHolidayWithNativeDate {
  isUpcoming: boolean;
}
interface HolidaysListProps {
  holidays: ReadonlyArray<Holiday>;
  month?: number;
}
export function HolidaysList({ holidays, month }: HolidaysListProps) {
  return (
    <ol className="flex flex-col gap-4">
      {holidays.map((holiday) => {
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
}) {
  if (isCurrentYear && isOver && month === undefined) {
    return "dim";
  }

  if (isUpcoming) {
    return "highlight";
  }

  return "default";
}
