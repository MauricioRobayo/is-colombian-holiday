import { ElementType, ReactNode } from "react";
import cn from "clsx";

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
      className={cn(
        "rounded-lg border-2  bg-white p-4 shadow-sm ",
        {
          "bg-slate-200 opacity-50": dim,
          "border-orange-200 transition hover:scale-105 hover:shadow-md":
            !disableHover && !dim,
          "bg-amber-50": highlight,
        },
        className
      )}
    >
      {children}
    </As>
  );
}
