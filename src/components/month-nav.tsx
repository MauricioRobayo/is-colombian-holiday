import { getMonths } from "@/utils/get-months";
import Link from "next/link";
import cn from "clsx";

interface MonthNavProps {
  selectedYear: number;
  selectedMonth?: number;
  selectedDay?: number;
}
export function MonthNav({
  selectedYear,
  selectedMonth,
  selectedDay,
}: MonthNavProps) {
  const months = getMonths();
  return (
    <div className="mt-4 grid grid-cols-3">
      {months.map((month, i) =>
        i + 1 !== selectedMonth || selectedDay ? (
          <Link
            key={month}
            className={cn("text-violet-400", {
              "font-bold": selectedDay && selectedMonth === i + 1,
              "text-white": selectedDay && selectedMonth === i + 1,
            })}
            href={`${selectedYear}/${String(i + 1)}`}
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
