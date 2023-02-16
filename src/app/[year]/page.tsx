import colombianHolidays from "colombian-holidays";
import { longDateFormatter } from "../../utils/date-helpers";

interface YearProps {
  params: {
    year: string;
  };
}
export default function Year({ params }: YearProps) {
  const holidays = colombianHolidays(Number(params.year));
  return (
    <>
      <header className="grid place-items-center h-36 sm:h-48 bg-violet-600 text-white border-b-8 border-b-orange-600 gap-2 sm:gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center self-end">
          Colombian Holidays
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold self-start">
          {params.year}
        </h2>
      </header>
      <main className="py-8 w-96 mx-auto text-center">
        <ol className="flex gap-4 flex-col">
          {holidays.map((holiday) => {
            const date = new Date(holiday.celebrationDate);
            return (
              <li key={holiday.name.en} className="">
                <time
                  className="text-xl sm:text-2xl"
                  dateTime={date.toISOString()}
                >
                  {longDateFormatter.format(date)}
                </time>
                <div>{holiday.name.en}</div>
              </li>
            );
          })}
        </ol>
      </main>
      <footer className="text-center h-36 grid place-items-center bg-violet-600 text-white">
        <div>
          <p className="mb-6">
            Check out the{" "}
            <a
              href="https://github.com/mauriciorobayo/colombian-holidays"
              className="underline"
            >
              colombian-holidays
            </a>{" "}
            npm package to calculate colombian holidays.
          </p>
          <p>
            This is an{" "}
            <a
              href="https://github.com/mauriciorobayo/is-colombian-holiday"
              className="underline"
            >
              open source
            </a>{" "}
            project.
          </p>
        </div>
      </footer>
    </>
  );
}

export function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({ year: String(1984 + i) }));
}
