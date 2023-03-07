import cn from "clsx";
import { getYears } from "@/utils/get-years";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface YearsListProp {
  years?: number;
  selectedYear?: number;
  className?: string;
}
export function YearsList({
  years = 25,
  selectedYear,
  className,
}: YearsListProp) {
  const today = new Date();
  return (
    <div className={twMerge("grid grid-cols-5 gap-x-4 gap-y-2", className)}>
      {getYears(years).map((year) => {
        const isCurrentYear = today.getUTCFullYear() === year;
        const isSelectedYear = year === selectedYear;
        return (
          <div key={year}>
            {isSelectedYear ? (
              <div
                className={twMerge(
                  "text-slate-400",
                  isCurrentYear && "text-lg font-bold"
                )}
              >
                {year}
              </div>
            ) : (
              <Link
                href={`/${year}`}
                className={cn(isCurrentYear && "text-lg font-bold")}
              >
                {year}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
