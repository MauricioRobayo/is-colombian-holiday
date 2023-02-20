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

export function getDate(year: number, month: number, day: number) {
  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  return new Date(`${year}-${paddedMonth}-${paddedDay}T00:00:00.000Z`);
}
