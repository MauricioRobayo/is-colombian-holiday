import Link from "next/link";
import { longDateFormatter, timeAgo } from "@/utils/date-helpers";
import { useMemo } from "react";
import cn from "clsx";
import { Celebration } from "../celebration";
import { Card } from "../card";

interface ListItemProps {
  date: Date;
  name: string;
  dim: boolean;
  highlight: boolean;
}
export function HolidayListItem({ date, name, dim, highlight }: ListItemProps) {
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
    <Card dim={dim} highlight={highlight} as="li">
      <Link href={path} className="flex flex-col justify-center gap-2">
        <time
          dateTime={date.toISOString()}
          className={cn("flex flex-col", {
            "gap-2 font-bold": highlight,
          })}
        >
          <div className={"text-base text-blue-600 sm:text-xl"}>
            {longDateFormatter.format(date)}
          </div>
          <div
            className={cn("sm:text-md flex justify-center gap-2 text-sm", {
              "flex-col": highlight,
            })}
          >
            <div>{name}</div>
            {highlight ? (
              <Celebration className="h-6 gap-2 text-sm">
                {relativeTime}
              </Celebration>
            ) : (
              <div className={cn({ "text-slate-400": !dim })}>
                {relativeTime}
              </div>
            )}
          </div>
        </time>
      </Link>
    </Card>
  );
}
