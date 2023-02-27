import Link from "next/link";
import { longDateFormatter, timeAgo } from "@/utils/date-helpers";
import { useMemo } from "react";
import cn from "clsx";

interface ListItemProps {
  date: Date;
  name: string;
}
export function HolidayListItem({ date, name }: ListItemProps) {
  const { relativeTime, path, isOver } = useMemo(
    () => ({
      relativeTime: timeAgo.format(date),
      path: `/${date
        .toISOString()
        .slice(0, 10)
        .split("-")
        .map(Number)
        .join("/")}`,
      isOver: date < new Date(),
    }),
    [date]
  );
  return (
    <li
      className={cn("rounded-lg border-2  bg-white p-4 shadow-sm transition", {
        "bg-slate-200 opacity-50": isOver,
        "border-orange-200 hover:scale-105 hover:shadow-md": !isOver,
      })}
    >
      <Link href={path}>
        <time dateTime={date.toISOString()}>
          <div className={"text-base text-blue-600 sm:text-xl"}>
            {longDateFormatter.format(date)}
          </div>
          <div className="sm:text-md text-sm ">
            {name}{" "}
            <span className={cn({ "text-slate-400": !isOver })}>
              {relativeTime}
            </span>
          </div>
        </time>
      </Link>
    </li>
  );
}
