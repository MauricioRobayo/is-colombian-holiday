import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
export function Main({ children }: MainProps) {
  return <main className="mx-auto w-96 py-8 text-center">{children}</main>;
}
