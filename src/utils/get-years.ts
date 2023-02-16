export function getYears() {
  const totalYears = 100;
  const currentYear = new Date().getUTCFullYear();
  const startYear = currentYear - totalYears / 2;
  const endYear = currentYear + totalYears / 2;

  return Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => i + startYear
  );
}
