import { useMonthNav } from "@/hooks/use-month-nav";
import { getMonths } from "@/utils/get-months";
import { ElementType } from "react";
import { twMerge } from "tailwind-merge";
import { H1 } from "./h1";
import { Nav } from "./nav";

const monthNames = getMonths();

interface MonthNavProps {
  year: number;
  month: number;
  className?: string;
  as?: ElementType;
}
export function MonthNav({
  year,
  month,
  className,
  as: As = "div",
}: MonthNavProps) {
  const { prev, next } = useMonthNav({ year, month });
  return (
    <Nav
      prev={{ name: "", path: prev.path }}
      next={{ name: "", path: next.path }}
      className={twMerge("justify-center gap-2", className)}
    >
      <As className="mb-0">
        {monthNames[month - 1]} {year}
      </As>
    </Nav>
  );
}
