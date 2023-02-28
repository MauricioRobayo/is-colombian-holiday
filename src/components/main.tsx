import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
export function Main({ children }: MainProps) {
  return (
    <main className="w-full max-w-lg self-center py-8 px-4 text-center">
      {children}
    </main>
  );
}
