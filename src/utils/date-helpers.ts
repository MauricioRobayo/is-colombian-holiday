export const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
  style: "long",
});

export function relativeDateDifference(startDate: Date, endDate: Date): string {
  const monthsDiff = endDate.getUTCMonth() - startDate.getUTCMonth();
  if (Math.abs(monthsDiff) > 1) {
    return relativeTimeFormatter.format(monthsDiff, "months");
  }

  const daysDiff = endDate.getUTCDate() - startDate.getUTCDate();
  const weeksDiff = Math.floor(daysDiff / 7);
  if (weeksDiff !== 0) {
    return relativeTimeFormatter.format(weeksDiff, "weeks");
  }

  return relativeTimeFormatter.format(daysDiff, "days");
}
