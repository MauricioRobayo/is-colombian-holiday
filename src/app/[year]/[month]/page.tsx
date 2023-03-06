import { useHolidays } from "@/hooks/use-holidays";
import { notFound } from "next/navigation";
import { ColombianHolidays } from "../../../components/colombian-holidays";
import { HolidaysList } from "../../../components/holidays-list/holidays-list";
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
  const holidays = useHolidays({ year, month });

  if (!holidays) {
    return notFound();
  }

  return (
    <ColombianHolidays year={year} month={month}>
      <HolidaysList holidays={holidays} month={month} />
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
