import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  subtitle?: ReactNode;
}
export function Header({ children, subtitle }: HeaderProps) {
  return (
    <header className="grid place-items-center border-b-8 border-b-orange-600 bg-violet-600 py-12 text-center text-white">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">{children}</h1>
        {subtitle && <div className="mt-2">{subtitle}</div>}
      </div>
    </header>
  );
}
