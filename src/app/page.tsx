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
        <div className="grid grid-cols-5 gap-4">
          {years.map((year) => (
            <Link
              key={year}
              href={String(year)}
              className="text-blue-700 underline"
            >
              {year}
            </Link>
          ))}
        </div>
      </Main>
    </>
  );
}
