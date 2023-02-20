import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
  style: "long",
});

TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo("en-US");

export function parseDateFromParams(year: string, month: string, day: string) {
  return Date.parse(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00.000Z`
  );
}
