import { longDateFormatter } from "@/utils/date-helpers";
import cn from "clsx";
import Link from "next/link";
import { Card, CardProps } from "../card";
import { Celebration } from "../celebration";
import { TimeAgo } from "../time-ago";

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
  const path = `/${date
    .toISOString()
    .slice(0, 10)
    .split("-")
    .map(Number)
    .join("/")}`;

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
                <TimeAgo date={date} data-superjson />
              </Celebration>
            ) : (
              <div className={cn({ "text-slate-400": variant !== "dim" })}>
                <TimeAgo date={date} data-superjson />
              </div>
            )}
          </div>
        </time>
      </Link>
    </Card>
  );
}
