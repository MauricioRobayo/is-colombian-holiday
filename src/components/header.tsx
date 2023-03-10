import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}
export function Header({ children }: HeaderProps) {
  return (
    <header className="grid place-items-center bg-violet-600 py-12 px-4 text-center text-white">
      <h2 className="text-3xl font-bold sm:text-4xl">
        <Link href="/">Colombian Holidays</Link>
      </h2>
      {children && <nav className="mt-2">{children}</nav>}
    </header>
  );
}
