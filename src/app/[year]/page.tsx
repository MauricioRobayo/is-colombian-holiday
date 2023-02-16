import { Header } from "../../components/header";
import { HolidaysList } from "../../components/holidays-list";
import { Main } from "../../components/main";
import { getYears } from "../../utils/get-years";

interface YearProps {
  params: {
    year: string;
  };
}
export default function Year({ params }: YearProps) {
  return (
    <>
      <Header subtitle={params.year}>Colombian Holidays</Header>
      <Main>
        <HolidaysList year={Number(params.year)} />
      </Main>
    </>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}
