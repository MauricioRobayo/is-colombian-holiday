import { getMonths } from "@/utils/get-months";
import Link from "next/link";
import cn from "clsx";
import { twMerge } from "tailwind-merge";

interface MonthListProps {
  selectedYear: number;
  selectedMonth?: number;
  selectedDay?: number;
  className?: string;
}
export function MonthList({
  selectedYear,
  selectedMonth,
  selectedDay,
  className,
}: MonthListProps) {
  const months = getMonths();
  return (
    <div className={twMerge("grid grid-cols-3", className)}>
      {months.map((month, i) =>
        i + 1 !== selectedMonth || selectedDay ? (
          <Link
            key={month}
            className={cn("text-violet-400", {
              "font-bold": selectedDay && selectedMonth === i + 1,
              "text-white": selectedDay && selectedMonth === i + 1,
            })}
            href={`/${selectedYear}/${String(i + 1)}`}
          >
            {month}
          </Link>
        ) : (
          <div key={month} className="font-bold">
            {month}
          </div>
        )
      )}
    </div>
  );
}
