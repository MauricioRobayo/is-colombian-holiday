import { notFound } from "next/navigation";

interface DayProps {
  params: {
    year: string;
    month: string;
    day: string;
  };
}
export default function Day({ params }: DayProps) {
  const { year, month, day } = params;
  const date = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  );

  if (Number.isNaN(date.getTime())) {
    return notFound();
  }

  return <div>{date.toISOString()}</div>;
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
