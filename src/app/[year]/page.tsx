import { useHolidays } from "@/hooks/use-holidays";
import { notFound } from "next/navigation";
import { ColombianHolidays } from "../../components/colombian-holidays";
import { HolidaysList } from "../../components/holidays-list/holidays-list";
import { getYears } from "../../utils/get-years";

interface YearProps {
  params: {
    year: string;
  };
}
export default function Year({ params }: YearProps) {
  const year = Number(params.year);
  const holidays = useHolidays({ year });

  if (!holidays) {
    return notFound();
  }

  return (
    <ColombianHolidays year={year}>
      <HolidaysList holidays={holidays} />
    </ColombianHolidays>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}
