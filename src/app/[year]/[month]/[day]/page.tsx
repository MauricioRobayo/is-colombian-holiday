import { notFound } from "next/navigation";
import { parseDateFromParams } from "../../../../utils/date-helpers";

interface DayProps {
  params: {
    year: string;
    month: string;
    day: string;
  };
}
export default function Day({ params }: DayProps) {
  const { year, month, day } = params;
  const date = parseDateFromParams(year, month, day);

  if (Number.isNaN(date)) {
    return notFound();
  }

  return <div>{date}</div>;
}

export function generateStaticParams() {
  const date = new Date();
  const params: { year: string; month: string; day: string }[] = [];
  for (let i = -100; i <= 100; i++) {
    const currentDate = new Date(date.getUTCDate() - i);
    params.push({
      year: String(currentDate.getUTCFullYear()),
      month: String(currentDate.getUTCMonth() + 1),
      day: String(currentDate.getUTCDate()),
    });
  }
  return params;
}
