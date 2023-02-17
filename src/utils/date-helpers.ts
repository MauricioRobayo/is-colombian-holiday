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

export function relativeTime(days: number): string {
  const absDays = Math.abs(days);

  if (absDays > 365) {
    return relativeTimeFormatter.format(Math.floor(days / 365), "years");
  }

  if (absDays > 30) {
    return relativeTimeFormatter.format(Math.floor(days / 30), "months");
  }

  if (absDays > 7) {
    return relativeTimeFormatter.format(Math.floor(days / 7), "weeks");
  }

  return relativeTimeFormatter.format(days, "days");
}
