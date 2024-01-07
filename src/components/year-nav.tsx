import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Nav } from "./nav";

interface YearNavProps {
  selectedYear?: number;
  selectedMonth?: number;
  className?: string;
}
export function YearNav({
  selectedYear = new Date().getUTCFullYear(),
  selectedMonth,
  className,
}: YearNavProps) {
  const prevYear = {
    name: String(selectedYear - 1),
    path: `${selectedYear - 1}`,
  };
  const nextYear = {
    name: String(selectedYear + 1),
    path: `${selectedYear + 1}`,
  };
  return (
    <Nav
      prev={prevYear}
      next={nextYear}
      className={twMerge(
        "items-center justify-around gap-8 text-lg font-bold text-violet-400",
        className,
      )}
    >
      <div className="text-4xl text-white">
        {selectedMonth ? (
          <Link href={`/${selectedYear}`}>
            <div>{selectedYear}</div>
          </Link>
        ) : (
          selectedYear
        )}
      </div>
    </Nav>
  );
}
