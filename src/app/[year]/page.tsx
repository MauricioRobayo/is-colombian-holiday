import { notFound } from "next/navigation";
import { ColombianHolidays } from "../../components/colombian-holidays";
import { HolidaysList } from "../../components/holidays-list";
import { getYears } from "../../utils/get-years";

interface YearProps {
  params: {
    year: string;
  };
}
export default function Year({ params }: YearProps) {
  const year = Number(params.year);

  if (Number.isNaN(year)) {
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
