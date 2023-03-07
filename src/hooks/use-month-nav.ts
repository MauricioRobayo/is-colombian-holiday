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
        name: `${monthFormatter.format(prevMonth)}, ${year}`,
        path: `/${prevMonth.getUTCFullYear()}/${prevMonth.getUTCMonth() + 1}`,
      },
      next: {
        name: `${monthFormatter.format(nextMonth)}, ${year}`,
        path: `/${nextMonth.getUTCFullYear()}/${nextMonth.getUTCMonth() + 1}`,
      },
    };
  }, [year, month]);
}
