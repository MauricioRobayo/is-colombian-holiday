import { FIRST_HOLIDAY_YEAR, LAST_HOLIDAY_YEAR } from "colombian-holidays";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export const longDateFormatterWithoutYear = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export const longDateFormatterWithYear = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
  style: "long",
});

TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo("en-US");

export function getDate(year: number, month: number, day: number) {
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
