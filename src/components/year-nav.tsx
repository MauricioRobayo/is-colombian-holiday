import Link from "next/link";

interface YearNavProps {
  selectedYear?: number;
  selectedMonth?: number;
}
export function YearNav({
  selectedYear = new Date().getUTCFullYear(),
  selectedMonth,
}: YearNavProps) {
  const previousYear = selectedYear - 1;
  const nextYear = selectedYear + 1;
  return (
    <div className="flex items-center justify-around gap-8 text-3xl font-bold sm:mt-4 sm:text-4xl">
      <Link className="text-lg text-violet-400" href={String(previousYear)}>
        &larr; {previousYear}
      </Link>
      {selectedMonth ? (
        <Link href={`/${String(selectedYear)}`}>
          <h2>{selectedYear}</h2>
        </Link>
      ) : (
        <h2>{selectedYear}</h2>
      )}
      <Link className="text-lg text-violet-400" href={String(nextYear)}>
        {nextYear} &rarr;
      </Link>
    </div>
  );
}
