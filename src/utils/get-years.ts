export function getYears() {
  const yearsRange = 25;
  const halfYearsRange = Math.floor(yearsRange / 2);
  const currentYear = new Date().getUTCFullYear();
  const startYear = currentYear - halfYearsRange;
  const endYear = currentYear + halfYearsRange + (yearsRange % 2 === 1 ? 1 : 0);

  return Array.from({ length: endYear - startYear }, (_, i) => i + startYear);
}
