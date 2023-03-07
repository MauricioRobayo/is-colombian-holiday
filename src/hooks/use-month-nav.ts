import { monthFormatter } from "@/utils/get-months";
import { useMemo } from "react";

interface Options {
  year: number;
  month: number;
}
export function useMonthNav({ year, month }: Options) {
  return useMemo(() => {
    const prevMonth = new Date(Date.UTC(year, month - 2, 1));
    const nextMonth = new Date(Date.UTC(year, month, 1));
    return {
      prev: {
        month: prevMonth.getUTCMonth() + 1,
        name: `${monthFormatter.format(prevMonth)}, ${year}`,
        year: prevMonth.getUTCFullYear(),
        path: `/${year}/${prevMonth.getUTCMonth() + 1}`,
      },
      next: {
        month: nextMonth.getUTCMonth() + 1,
        name: `${monthFormatter.format(nextMonth)}, ${year}`,
        year: nextMonth.getUTCFullYear(),
        path: `/${year}/${nextMonth.getUTCMonth() + 1}`,
      },
    };
  }, [year, month]);
}
