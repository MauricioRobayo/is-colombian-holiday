import { getYears } from "@/utils/get-years";
import { Link } from "@/components/link";

interface YearsListProp {
  years?: number;
  selectedYear?: number;
}
export function YearsList({ years = 25, selectedYear }: YearsListProp) {
  return (
    <div className="grid grid-cols-5 gap-x-4 gap-y-2">
      {getYears(years).map((year) => {
        return (
          <div key={year}>
            {year === selectedYear ? (
              <div className="text-md font-bold">{year}</div>
            ) : (
              <Link href={`/${year}`}>{year}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
