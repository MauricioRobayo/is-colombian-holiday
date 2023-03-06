import cn from "clsx";
import { getYears } from "@/utils/get-years";
import { Link } from "@/components/link";

interface YearsListProp {
  years?: number;
  selectedYear?: number;
}
export function YearsList({ years = 25, selectedYear }: YearsListProp) {
  const today = new Date();
  return (
    <div className="grid grid-cols-5 gap-x-4 gap-y-2">
      {getYears(years).map((year) => {
        const isCurrentYear = today.getUTCFullYear() === year;
        const isSelectedYear = year === selectedYear;
        console.log(isCurrentYear);
        return (
          <div key={year}>
            {isSelectedYear ? (
              <div
                className={cn(
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
