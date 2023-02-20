import { notFound } from "next/navigation";
import { ColombianHolidays } from "../../../../components/colombian-holidays";
import { getDate } from "../../../../utils/date-helpers";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import colombianHolidays from "colombian-holidays";

interface DayProps {
  params: {
    year: string;
    month: string;
    day: string;
  };
}
export default function Day({ params }: DayProps) {
  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);
  const date = getDate(year, month, day);

  if (Number.isNaN(date.getTime())) {
    return notFound();
  }

  return (
    <ColombianHolidays year={year} month={month} day={day}>
      {isHoliday(date) ? (
        <div>Yeah, it is holiday :)</div>
      ) : (
        <div>Darn! not holiday :(</div>
      )}
    </ColombianHolidays>
  );
}

export function generateStaticParams() {
  const holidays = colombianHolidays({ returnNativeDate: true });
  return holidays.map((holiday) => ({
    year: String(holiday.celebrationDate.getUTCFullYear()),
    month: String(holiday.celebrationDate.getUTCMonth() + 1),
    day: String(holiday.celebrationDate.getUTCDate()),
  }));
}
