import { Wrapper } from "./wrapper";
import { YearsList } from "./years-list";

export function Footer() {
  return (
    <footer className="grid place-items-center bg-violet-600 p-4 text-center text-white">
      <Wrapper>
        <YearsList />
      </Wrapper>
      <Wrapper>
        <h4 className="text-md mb-4 font-bold">Public Holidays in Colombia</h4>
        <p className="mb-4">
          Colombia has 18 holidays (12 Catholic holidays and 6 Civic holidays),
          plus Palm and Easter Sunday.
        </p>
      </Wrapper>
    </footer>
  );
}
