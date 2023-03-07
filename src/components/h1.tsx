import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface H1Props {
  children?: ReactNode;
  className?: string;
}
export function H1({ children, className }: H1Props) {
  return (
    <h1 className={twMerge("mb-8 text-2xl font-bold", className)}>
      {children}
    </h1>
  );
}
