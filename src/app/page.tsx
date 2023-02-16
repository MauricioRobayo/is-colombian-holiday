import Link from "next/link";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { getYears } from "../utils/get-years";

export default function Home() {
  const years = getYears();
  return (
    <>
      <Header>Colombian Holidays</Header>
      <Main>
        <div className="grid gap-4 grid-cols-5">
          {years.map((year) => (
            <Link
              key={year}
              href={String(year)}
              className="underline text-blue-700"
            >
              {year}
            </Link>
          ))}
        </div>
      </Main>
    </>
  );
}
