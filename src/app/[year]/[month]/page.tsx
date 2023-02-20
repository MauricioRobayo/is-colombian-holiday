import { notFound } from "next/navigation";
import { ColombianHolidays } from "../../../components/colombian-holidays";
import { HolidaysList } from "../../../components/holidays-list";
import { parseDate } from "../../../utils/date-helpers";
import { getYears } from "../../../utils/get-years";

interface MonthProps {
  params: {
    year: string;
    month: string;
  };
}
export default function Month({ params }: MonthProps) {
  const year = Number(params.year);
  const month = Number(params.month);

  const date = parseDate(year, month, 1);

  if (Number.isNaN(date)) {
    return notFound();
  }

  return (
    <ColombianHolidays year={year} month={month}>
      <HolidaysList year={Number(year)} month={month} />
    </ColombianHolidays>
  );
}

export function generateStaticParams() {
  return getYears().flatMap((year) =>
    Array.from({ length: 12 }, (_, i) => ({
      year: String(year),
      month: String(i + 1),
    }))
  );
}
