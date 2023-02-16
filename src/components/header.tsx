import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  subtitle?: string;
}
export function Header({ children, subtitle }: HeaderProps) {
  return (
    <header className="grid h-36 place-items-center border-b-8 border-b-orange-600 bg-violet-600 text-center text-white sm:h-48">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">{children}</h1>
        {subtitle && (
          <h2 className="mt-2 text-3xl font-bold sm:mt-4 sm:text-4xl">
            {subtitle}
          </h2>
        )}
      </div>
    </header>
  );
}
