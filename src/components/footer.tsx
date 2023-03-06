import { getYears } from "@/utils/get-years";
import { Wrapper } from "./wrapper";

export function Footer() {
  return (
    <footer className="grid place-items-center bg-violet-600 p-4 text-center text-white">
      <Wrapper>
        <h4 className="text-md mb-4 font-bold">Public Holidays in Colombia</h4>
        <p className="mb-4">
          Colombia has 18 holidays (12 Catholic holidays and 6 Civic holidays),
          plus Palm and Easter Sunday.
        </p>
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
      </Wrapper>
    </footer>
  );
}
