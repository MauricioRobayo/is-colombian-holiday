import { FIRST_HOLIDAY_YEAR, LAST_HOLIDAY_YEAR } from "colombian-holidays";
import { notFound } from "next/navigation";
import { ColombianHolidays } from "../../components/colombian-holidays";
import { HolidaysList } from "../../components/holidays-list/holidays-list";
import { parseDate } from "../../utils/date-helpers";
import { getYears } from "../../utils/get-years";

interface YearProps {
  params: {
    year: string;
  };
}
export default function Year({ params }: YearProps) {
  const year = Number(params.year);

  if (Number.isNaN(parseDate(year, 1, 1))) {
    return notFound();
  }

  return (
    <ColombianHolidays year={year}>
      <HolidaysList year={Number(year)} />
    </ColombianHolidays>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}
