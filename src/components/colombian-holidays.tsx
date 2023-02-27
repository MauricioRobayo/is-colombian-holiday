import Link from "next/link";
import { ReactNode } from "react";
import { getMonths } from "../utils/get-months";
import { Header } from "./header";
import { Main } from "./main";
import cn from "clsx";

interface ColombianHolidaysProps {
  year: number;
  month?: number;
  day?: number;
  children: ReactNode;
}
export function ColombianHolidays({
  year,
  month: selectedMonth,
  day: selectedDay,
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
          i + 1 !== selectedMonth || selectedDay ? (
            <Link
              key={month}
              className={cn("text-violet-400", {
                "font-bold": selectedDay && selectedMonth === i + 1,
                "text-white": selectedDay && selectedMonth === i + 1,
              })}
              href={`${year}/${String(i + 1)}`}
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
    </div>
  );
  return (
    <>
      <Header subtitle={subtitle}>
        <Link href="/">Colombian Holidays</Link>
      </Header>
      <Main>{children}</Main>
    </>
  );
}
