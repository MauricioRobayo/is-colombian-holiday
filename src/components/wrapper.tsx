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
        "my-4 w-full max-w-lg self-center py-4 px-4 text-center",
        className
      )}
    >
      {children}
    </As>
  );
}
