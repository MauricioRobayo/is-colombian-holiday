export function getYears() {
  const totalYears = 10;
  const currentYear = new Date().getUTCFullYear();
  const startYear = currentYear - totalYears / 2;
  const endYear = currentYear + totalYears / 2;

  return Array.from({ length: endYear - startYear }, (_, i) => i + startYear);
}
