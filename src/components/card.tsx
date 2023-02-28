import { ElementType, ReactNode } from "react";
import cn from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  dim?: boolean;
  highlight?: boolean;
  children: ReactNode;
  as?: ElementType;
  className?: string;
  disableHover?: boolean;
}
export function Card({
  dim = false,
  highlight = false,
  children,
  as: As = "div",
  className,
  disableHover = false,
}: CardProps) {
  return (
    <As
      className={twMerge(
        "rounded-lg border-2  border-orange-200 bg-white p-4 shadow-sm",
        cn({
          "border-none bg-slate-200 opacity-75": dim,
          "transition hover:scale-105 hover:shadow-md": !disableHover && !dim,
          "bg-amber-50": highlight,
        }),
        className
      )}
    >
      {children}
    </As>
  );
}