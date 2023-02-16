import { Link } from "../components/link";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { getYears } from "../utils/get-years";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const years = getYears();
  const currentYear = new Date().getUTCFullYear();
  return (
    <>
      <Header>Colombian Holidays</Header>
      <Main>
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {years.map((year) => (
            <Link
              key={year}
              href={String(year)}
              className={twMerge(year === currentYear && "text-lg font-bold")}
            >
              {year}
            </Link>
          ))}
        </div>
      </Main>
    </>
  );
}
