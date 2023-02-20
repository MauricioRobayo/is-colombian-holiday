import Link from "next/link";
import { ReactNode } from "react";
import { getMonths } from "../utils/get-months";
import { Header } from "./header";
import { Main } from "./main";

interface ColombianHolidaysProps {
  year: number;
  month?: number;
  day?: number;
  children: ReactNode;
}
export function ColombianHolidays({
  year,
  month: selectedMonth,
  children,
}: ColombianHolidaysProps) {
  const previousYear = year - 1;
  const nextYear = year + 1;
  const months = getMonths();
  const subtitle = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-around text-3xl font-bold sm:mt-4 sm:text-4xl">
        <Link className="text-lg text-violet-400" href={String(previousYear)}>
          &larr; {previousYear}
        </Link>
        {selectedMonth ? (
          <Link href={`/${String(year)}`}>
            <h2>{year}</h2>
          </Link>
        ) : (
          <h2>{year}</h2>
        )}
        <Link className="text-lg text-violet-400" href={String(nextYear)}>
          {nextYear} &rarr;
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-3">
        {months.map((month, i) =>
          i + 1 === selectedMonth ? (
            <div key={month} className="font-bold">
              {month}
            </div>
          ) : (
            <Link
              key={month}
              className="text-violet-400"
              href={`${year}/${String(i + 1)}`}
            >
              {month}
            </Link>
          )
        )}
      </div>
    </div>
  );
  return (
    <>
      <Header subtitle={subtitle}>Colombian Holidays</Header>
      <Main>{children}</Main>
    </>
  );
}
