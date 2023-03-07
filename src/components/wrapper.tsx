import { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MainProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}
export function Wrapper({ children, className, as: As = "div" }: MainProps) {
  return (
    <As
      className={twMerge(
        "w-full max-w-lg self-center p-4 text-center",
        className
      )}
    >
      {children}
    </As>
  );
}
