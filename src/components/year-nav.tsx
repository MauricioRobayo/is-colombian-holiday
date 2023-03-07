import Link from "next/link";
import { twMerge } from "tailwind-merge";

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
  const previousYear = selectedYear - 1;
  const nextYear = selectedYear + 1;
  return (
    <div
      className={twMerge(
        "flex items-center justify-around gap-8 text-3xl font-bold sm:text-4xl",
        className
      )}
    >
      <Link className="text-lg text-violet-400" href={String(previousYear)}>
        &larr; {previousYear}
      </Link>
      {selectedMonth ? (
        <Link href={`/${String(selectedYear)}`}>
          <div>{selectedYear}</div>
        </Link>
      ) : (
        <div>{selectedYear}</div>
      )}
      <Link className="text-lg text-violet-400" href={String(nextYear)}>
        {nextYear} &rarr;
      </Link>
    </div>
  );
}
