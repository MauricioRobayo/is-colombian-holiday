import Link from "next/link";
import { longDateFormatter, timeAgo } from "@/utils/date-helpers";
import { useMemo } from "react";

interface ListItemProps {
  date: Date;
  name: string;
}
export function HolidayListItem({ date, name }: ListItemProps) {
  const { relativeTime, path } = useMemo(
    () => ({
      relativeTime: timeAgo.format(date),
      path: `/${date
        .toISOString()
        .slice(0, 10)
        .split("-")
        .map(Number)
        .join("/")}`,
    }),
    [date]
  );
  return (
    <li className="rounded-lg border-2 border-orange-100 bg-white p-4 shadow-sm transition hover:bg-orange-50 hover:shadow-md">
      <Link href={path}>
        <time dateTime={date.toISOString()}>
          <div className={"text-base text-blue-600 sm:text-xl"}>
            {longDateFormatter.format(date)}
          </div>
          <div className="sm:text-md text-sm ">
            {name} <span className="text-slate-400">{relativeTime}</span>
          </div>
        </time>
      </Link>
    </li>
  );
}
