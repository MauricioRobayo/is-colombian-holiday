import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
export function Main({ children }: MainProps) {
  return <main className="mx-auto max-w-lg py-8 text-center">{children}</main>;
}
