import colombianHolidays from "colombian-holidays";
import { Header } from "../../components/header";
import { Main } from "../../components/main";
import { longDateFormatter } from "../../utils/date-helpers";
import { getYears } from "../../utils/get-years";

interface YearProps {
  params: {
    year: string;
  };
}
export default function Year({ params }: YearProps) {
  const holidays = colombianHolidays(Number(params.year), {
    returnNativeDate: true,
  });
  return (
    <>
      <Header subtitle={params.year}>Colombian Holidays</Header>
      <Main>
        <ol className="flex gap-4 flex-col">
          {holidays.map((holiday) => {
            return (
              <li key={holiday.name.en} className="">
                <time
                  className="text-xl sm:text-2xl"
                  dateTime={holiday.celebrationDate.toISOString()}
                >
                  {longDateFormatter.format(holiday.celebrationDate)}
                </time>
                <div className="text-md sm:text-lg">{holiday.name.en}</div>
              </li>
            );
          })}
        </ol>
      </Main>
    </>
  );
}

export function generateStaticParams() {
  return getYears().map((year) => ({ year: String(year) }));
}
