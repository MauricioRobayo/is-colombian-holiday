import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  subtitle?: string;
}
export function Header({ children, subtitle }: HeaderProps) {
  return (
    <header className="grid place-items-center h-36 sm:h-48 bg-violet-600 text-white border-b-8 border-b-orange-600 text-center">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">{children}</h1>
        {subtitle && (
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-4">
            {subtitle}
          </h2>
        )}
      </div>
    </header>
  );
}
