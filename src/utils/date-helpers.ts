import { FIRST_HOLIDAY_YEAR, LAST_HOLIDAY_YEAR } from "colombian-holidays";

export const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

// https://github.com/hustcc/timeago.js/blob/master/src/utils/date.ts
const relativeTime = new Intl.RelativeTimeFormat("en-US");
const units: Array<{ amount: number; name: Intl.RelativeTimeFormatUnit }> = [
  { amount: 7, name: "days" },
  { amount: 365 / 12 / 7, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];
export function timeAgo(date: Date) {
  const startOfDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
  const startOfToday = new Date(new Date().setUTCHours(0, 0, 0, 0));
  let duration =
    (startOfDate.getTime() - startOfToday.getTime()) / 1000 / 60 / 60 / 24;
  for (const { amount, name } of units) {
    if (Math.abs(duration) < amount) {
      return relativeTime.format(Math.round(duration), name);
    }
    duration /= amount;
  }
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
