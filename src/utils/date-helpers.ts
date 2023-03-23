import { FIRST_HOLIDAY_YEAR, LAST_HOLIDAY_YEAR } from "colombian-holidays";
import { format as timeAgoFormat } from "timeago.js";

export const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

type TimeAgoParams = Parameters<typeof timeAgoFormat>;
export function timeAgo(...params: TimeAgoParams) {
  return timeAgoFormat(...params);
}

export function composeDate(year: number, month: number, day: number) {
  return new Date(parseDate(year, month, day));
}

export function parseDate(year: number, month: number, day: number) {
  if (year < FIRST_HOLIDAY_YEAR || year > LAST_HOLIDAY_YEAR) {
    return Number.NaN;
  }
  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  return Date.parse(`${year}-${paddedMonth}-${paddedDay}T00:00:00.000Z`);
}

export function formatDateAsPath(date: Date) {
  return `/${date.getUTCFullYear()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCDate()}`;
}
