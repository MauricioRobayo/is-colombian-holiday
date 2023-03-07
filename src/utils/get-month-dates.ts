interface Options {
  year: number;
  month: number;
}
export function getMonthDates({ year, month }: Options): ReadonlyArray<Date> {
  const dates: Array<Date> = [];
  const date = new Date(Date.UTC(year, month - 1, 1));
  while (date.getUTCMonth() === month - 1) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}
