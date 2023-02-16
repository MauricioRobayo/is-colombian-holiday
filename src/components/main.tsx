import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
export function Main({ children }: MainProps) {
  return <main className="py-8 w-96 mx-auto text-center">{children}</main>;
}
