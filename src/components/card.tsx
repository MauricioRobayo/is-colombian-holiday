import { ElementType, ReactNode } from "react";
import cn from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps {
  variant?: "dim" | "highlight" | "hero" | "default";
  children: ReactNode;
  as?: ElementType;
  className?: string;
  disableHover?: boolean;
}
export function Card({
  variant = "default",
  children,
  as: As = "div",
  className,
  disableHover = false,
}: CardProps) {
  const dim = variant === "dim";
  const highlight = variant === "highlight";
  const hero = variant === "hero";
  return (
    <As
      className={twMerge(
        "rounded-lg border-2 border-orange-200 bg-white p-4 shadow-sm",
        cn({
          "border-none bg-slate-200 opacity-75": dim,
          "transition hover:scale-105 hover:shadow-md": !disableHover && !dim,
          "bg-amber-50": highlight,
          "flex flex-col items-center p-8 text-xl ": hero,
        }),
        className
      )}
    >
      {children}
    </As>
  );
}
