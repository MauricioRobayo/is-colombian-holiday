import Link from "next/link";
import { longDateFormatter, timeAgo } from "@/utils/date-helpers";
import { useMemo } from "react";
import cn from "clsx";
import { Celebration } from "../celebration";
import { Card, CardProps } from "../card";

export interface ListItemProps {
  date: Date;
  name: string;
  variant?: CardProps<"li">["variant"];
}
export function HolidayListItem({
  date,
  name,
  variant = "default",
}: ListItemProps) {
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
    <Card variant={variant} as="li">
      <Link href={path} className="flex flex-col justify-center gap-2">
        <time
          dateTime={date.toISOString()}
          className={cn("flex flex-col", {
            "gap-2 font-bold": variant === "highlight",
          })}
        >
          <div className={"text-base text-blue-600 sm:text-xl"}>
            {longDateFormatter.format(date)}
          </div>
          <div
            className={cn("sm:text-md flex justify-center gap-2 text-sm", {
              "flex-col": variant === "highlight",
            })}
          >
            <div>{name}</div>
            {variant === "highlight" ? (
              <Celebration className="h-6 gap-2 text-sm">
                {relativeTime}
              </Celebration>
            ) : (
              <div className={cn({ "text-slate-400": variant !== "dim" })}>
                {relativeTime}
              </div>
            )}
          </div>
        </time>
      </Link>
    </Card>
  );
}
