const monthFormatter = new Intl.DateTimeFormat(undefined, {
  month: "long",
});
export function getMonths() {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setUTCMonth(i);
    return monthFormatter.format(date);
  });
}
